# 🚀 Kubernetes Deployment Guide

Complete step-by-step guide to deploy your NestJS BiddingService app with PostgreSQL to Kubernetes.

---

## 📋 Prerequisites

### 1. Tools Required
- **Docker** - Build and run containers
- **Kubernetes** - One of:
  - Docker Desktop (Mac/Windows) with Kubernetes enabled
  - Minikube
  - Cloud provider (AWS EKS, GCP GKE, Azure AKS)
- **kubectl** - Kubernetes command-line tool
- **Docker Hub account** - To store your Docker image

### 2. Verify Installation
```bash
# Check Docker
docker --version

# Check Kubernetes
kubectl version --client

# Check cluster is running
kubectl cluster-info

# Check nodes
kubectl get nodes
```

---

## 🏗️ Part 1: Build and Push Docker Image

### Step 1: Build Your Docker Image
```bash
# Navigate to project root
cd /Users/kibo/Desktop/kibo-app/biddingservice

# Build the image (this uses your Dockerfile)
# Format: docker build -t <dockerhub-username>/<image-name>:<tag> .
docker build -t markkibo/biddingservice:latest .

# This will take a few minutes (installing dependencies, building, etc.)
```

**What's happening?**
- Stage 1: Installs dependencies, generates Prisma client, builds TypeScript
- Stage 2: Creates production image with only what's needed to run

### Step 2: Test Image Locally (Optional)
```bash
# Run the container locally to test
docker run -p 3000:3000 \
  -e DATABASE_URL="postgresql://postgres:kibo_password@host.docker.internal:5435/bidding_db?schema=public" \
  markkibo/biddingservice:latest

# Access: http://localhost:3000
# Press Ctrl+C to stop
```

### Step 3: Login to Docker Hub
```bash
# Login with your Docker Hub credentials
docker login

# Enter username: markkibo
# Enter password: (your Docker Hub password)
```

### Step 4: Push Image to Docker Hub
```bash
# Push the image (makes it available for Kubernetes)
docker push markkibo/biddingservice:latest

# This uploads your image to Docker Hub
# Kubernetes will pull from here when deploying
```

**Verify on Docker Hub:**
- Go to https://hub.docker.com
- Check your repositories
- You should see `markkibo/biddingservice`

---

## ☸️ Part 2: Deploy to Kubernetes

### Understanding the Deployment Order

We apply files in a specific order because of dependencies:

```
1. Secrets & ConfigMaps (data needed by deployments)
2. PersistentVolumeClaim (storage)
3. PostgreSQL Deployment (database)
4. PostgreSQL Service (network access to database)
5. App Deployment (your NestJS app)
6. App Service (expose app to internet)
```

### Step 1: Deploy PostgreSQL

#### 1a. Create PostgreSQL Secret
```bash
kubectl apply -f infra/1-postgres-secret.yaml
```
**Check it:**
```bash
kubectl get secret postgres-secret
kubectl describe secret postgres-secret
```

#### 1b. Create PostgreSQL Storage
```bash
kubectl apply -f infra/2-postgres-pvc.yaml
```
**Check it:**
```bash
kubectl get pvc postgres-pvc
# Status should be "Bound"
```

#### 1c. Create PostgreSQL Deployment
```bash
kubectl apply -f infra/3-postgres-deployment.yaml
```
**Check it:**
```bash
kubectl get deployment postgres
kubectl get pods -l app=postgres

# Wait for pod to be Ready (1/1)
kubectl wait --for=condition=ready pod -l app=postgres --timeout=120s

# Check logs
kubectl logs -l app=postgres
```

#### 1d. Create PostgreSQL Service
```bash
kubectl apply -f infra/4-postgres-service.yaml
```
**Check it:**
```bash
kubectl get service postgres
kubectl describe service postgres

# Check endpoints (should show pod IP)
kubectl get endpoints postgres
```

### Step 2: Deploy NestJS App

#### 2a. Create App ConfigMap
```bash
kubectl apply -f infra/5-app-configmap.yaml
```
**Check it:**
```bash
kubectl get configmap app-config
kubectl describe configmap app-config
```

#### 2b. Create App Secret
```bash
kubectl apply -f infra/6-app-secret.yaml
```
**Check it:**
```bash
kubectl get secret app-secret
kubectl describe secret app-secret
```

#### 2c. Create App Deployment
```bash
kubectl apply -f infra/7-app-deployment.yaml
```
**Check it:**
```bash
kubectl get deployment biddingservice
kubectl get pods -l app=biddingservice

# Wait for pods to be Ready (2/2)
kubectl wait --for=condition=ready pod -l app=biddingservice --timeout=120s

# Check logs (follow)
kubectl logs -l app=biddingservice -f

# Press Ctrl+C to stop following logs
```

#### 2d. Create App Service
```bash
kubectl apply -f infra/8-app-service.yaml
```
**Check it:**
```bash
kubectl get service biddingservice
kubectl describe service biddingservice
```

---

## 🌐 Part 3: Access Your Application

### Get External Access URL

#### On Docker Desktop:
```bash
kubectl get service biddingservice

# Output:
# NAME             TYPE           EXTERNAL-IP   PORT(S)        AGE
# biddingservice   LoadBalancer   localhost     80:30123/TCP   1m

# Access at: http://localhost:80
```

#### On Minikube:
```bash
# Open a new terminal and run:
minikube tunnel

# In original terminal:
kubectl get service biddingservice

# Access at the EXTERNAL-IP shown
```

#### On Cloud (AWS/GCP/Azure):
```bash
kubectl get service biddingservice

# Wait for EXTERNAL-IP (may take 1-2 minutes)
# Access at: http://<EXTERNAL-IP>:80
```

### Test Your API
```bash
# Health check (if you have one)
curl http://localhost:80/health

# Or your API endpoints
curl http://localhost:80/api/products

# Or open in browser:
open http://localhost:80
```

---

## 🔍 Part 4: Monitoring and Debugging

### View All Resources
```bash
# See everything
kubectl get all

# See specific resources
kubectl get pods
kubectl get deployments
kubectl get services
kubectl get secrets
kubectl get configmaps
kubectl get pvc
```

### Check Pod Status
```bash
# Get pod details
kubectl describe pod <pod-name>

# Get pod logs
kubectl logs <pod-name>

# Follow logs in real-time
kubectl logs -f <pod-name>

# Get logs from all app pods
kubectl logs -l app=biddingservice -f

# Get previous pod logs (if pod crashed)
kubectl logs <pod-name> --previous
```

### Execute Commands in Pod
```bash
# Get shell access
kubectl exec -it <pod-name> -- /bin/sh

# Run single command
kubectl exec <pod-name> -- ls -la

# Check environment variables
kubectl exec <pod-name> -- env

# Test database connection from app pod
kubectl exec <pod-name> -- wget -qO- http://postgres:5432
```

### Debug Database
```bash
# Get PostgreSQL pod name
kubectl get pods -l app=postgres

# Connect to PostgreSQL
kubectl exec -it <postgres-pod-name> -- psql -U postgres -d bidding_db

# Inside psql:
\dt              # List tables
\d products      # Describe products table
SELECT * FROM products LIMIT 5;
\q               # Quit
```

### Common Issues and Solutions

#### 1. Pod Not Starting
```bash
# Check pod status
kubectl describe pod <pod-name>

# Common issues:
# - Image pull error: Check Docker Hub image exists
# - CrashLoopBackOff: Check logs for application errors
# - Pending: Check if PVC is bound, node has resources
```

#### 2. Cannot Connect to Database
```bash
# Check PostgreSQL is running
kubectl get pods -l app=postgres

# Check service exists
kubectl get service postgres

# Test DNS resolution from app pod
kubectl exec <app-pod-name> -- nslookup postgres

# Test connection
kubectl exec <app-pod-name> -- nc -zv postgres 5432
```

#### 3. Service Not Accessible
```bash
# Check service
kubectl get service biddingservice

# Check endpoints (should show pod IPs)
kubectl get endpoints biddingservice

# If no endpoints, pods might not be ready
kubectl get pods -l app=biddingservice
```

---

## 🔄 Part 5: Making Updates

### Update Application Code

#### 1. Make code changes
```bash
# Edit your source code
# Then rebuild and push:

docker build -t markkibo/biddingservice:latest .
docker push markkibo/biddingservice:latest
```

#### 2. Rolling Update
```bash
# Kubernetes automatically does rolling update
# Just restart the deployment:

kubectl rollout restart deployment biddingservice

# Watch the rollout
kubectl rollout status deployment biddingservice

# Check history
kubectl rollout history deployment biddingservice
```

#### 3. Rollback if Needed
```bash
# Rollback to previous version
kubectl rollout undo deployment biddingservice

# Rollback to specific revision
kubectl rollout undo deployment biddingservice --to-revision=2
```

### Update Configuration

#### Update ConfigMap
```bash
# Edit the file: infra/5-app-configmap.yaml
# Then apply:
kubectl apply -f infra/5-app-configmap.yaml

# Restart pods to pick up changes
kubectl rollout restart deployment biddingservice
```

#### Update Secret
```bash
# Edit the file: infra/6-app-secret.yaml
# Encode new values: echo -n "new-value" | base64
# Then apply:
kubectl apply -f infra/6-app-secret.yaml

# Restart pods
kubectl rollout restart deployment biddingservice
```

### Scale Application

#### Manual Scaling
```bash
# Scale to 3 replicas
kubectl scale deployment biddingservice --replicas=3

# Check status
kubectl get pods -l app=biddingservice
```

#### Auto-scaling (HPA)
```bash
# Create horizontal pod autoscaler
kubectl autoscale deployment biddingservice \
  --cpu-percent=70 \
  --min=2 \
  --max=10

# Check HPA status
kubectl get hpa
```

---

## 🧹 Part 6: Cleanup

### Delete Application Only
```bash
kubectl delete -f infra/8-app-service.yaml
kubectl delete -f infra/7-app-deployment.yaml
kubectl delete -f infra/6-app-secret.yaml
kubectl delete -f infra/5-app-configmap.yaml
```

### Delete Database Only
```bash
kubectl delete -f infra/4-postgres-service.yaml
kubectl delete -f infra/3-postgres-deployment.yaml
kubectl delete -f infra/2-postgres-pvc.yaml  # ⚠️ This deletes data!
kubectl delete -f infra/1-postgres-secret.yaml
```

### Delete Everything
```bash
# Delete all at once (in reverse order)
kubectl delete -f infra/8-app-service.yaml
kubectl delete -f infra/7-app-deployment.yaml
kubectl delete -f infra/6-app-secret.yaml
kubectl delete -f infra/5-app-configmap.yaml
kubectl delete -f infra/4-postgres-service.yaml
kubectl delete -f infra/3-postgres-deployment.yaml
kubectl delete -f infra/2-postgres-pvc.yaml
kubectl delete -f infra/1-postgres-secret.yaml

# Or delete by directory
kubectl delete -f infra/

# Verify everything is gone
kubectl get all
```

---

## 📊 Part 7: Production Considerations

### 1. Use Proper Image Tags
```bash
# Instead of :latest, use version tags
docker build -t markkibo/biddingservice:v1.0.0 .
docker push markkibo/biddingservice:v1.0.0

# Update deployment:
# image: markkibo/biddingservice:v1.0.0
```

### 2. Resource Limits
Already set in deployments, but adjust based on your needs:
```yaml
resources:
  requests:
    memory: "256Mi"
    cpu: "250m"
  limits:
    memory: "512Mi"
    cpu: "500m"
```

### 3. Database Backups
```bash
# Manual backup
kubectl exec <postgres-pod> -- pg_dump -U postgres bidding_db > backup.sql

# Restore
kubectl exec -i <postgres-pod> -- psql -U postgres bidding_db < backup.sql
```

### 4. SSL/TLS (HTTPS)
For production, use Ingress with cert-manager for automatic SSL certificates.

### 5. Monitoring
Consider adding:
- Prometheus + Grafana (metrics)
- ELK Stack (logs)
- Jaeger (tracing)

### 6. Secrets Management
For production, use:
- External Secrets Operator
- HashiCorp Vault
- Cloud provider secret managers (AWS Secrets Manager, GCP Secret Manager)

---

## 🎯 Quick Reference Commands

```bash
# Deploy everything (from scratch)
kubectl apply -f infra/

# Check all resources
kubectl get all

# Follow app logs
kubectl logs -l app=biddingservice -f

# Get service URL
kubectl get service biddingservice

# Scale app
kubectl scale deployment biddingservice --replicas=3

# Update app
docker build -t markkibo/biddingservice:latest . && \
docker push markkibo/biddingservice:latest && \
kubectl rollout restart deployment biddingservice

# Cleanup everything
kubectl delete -f infra/
```

---

## 🆘 Getting Help

```bash
# Get help for any command
kubectl --help
kubectl get --help
kubectl describe --help

# Explain resource types
kubectl explain pod
kubectl explain deployment
kubectl explain service

# API resources
kubectl api-resources
```

---

## 🎉 Congratulations!

You've successfully deployed your NestJS application with PostgreSQL to Kubernetes!

**What you've learned:**
- Docker multi-stage builds
- Kubernetes Secrets and ConfigMaps
- Persistent storage in Kubernetes
- Deployments with replicas and rolling updates
- Services (ClusterIP and LoadBalancer)
- Health checks and probes
- Monitoring and debugging

**Next steps:**
- Add health check endpoints to your NestJS app
- Set up CI/CD pipeline (GitHub Actions, GitLab CI)
- Configure Ingress for multiple services
- Add monitoring and logging
- Implement database migrations
