# ☁️ Project SE for Cloud: Estimating Developer Productivity and Bug Frequency Based on Caffeine Consumption

## 📖 Executive Summary

This project presents a complete, containerized, and distributed system designed to estimate developer productivity and bug frequency based on daily caffeine intake. The application demonstrates modern cloud-native patterns including Docker containerization, Kubernetes orchestration, Infrastructure as Code (Terraform), and Cloud hosting (AWS), using Nginx as a Reverse Proxy.

---

## 🏗️ System Architecture & Microservices

The application is decoupled into distinct layers to ensure high availability and independent scalability:

### 🖥️ Frontend (Next.js Dashboard)
- Located in: `caffeine-frontend/`
- Provides a reactive user interface for data input and visualization of results.

### ⚙️ Service 1 – Caffeine Meter (Port 3001)
- Located in: `caffeine-meter/`
- Acts as the primary logic orchestrator.
- Responsibilities:
  - Receives user input
  - Calculates estimated **Lines of Code (LOC)**
  - Makes internal REST calls to the Bug Predictor service

### 🧠 Service 2 – Bug Predictor (Port 3002)
- Located in: `bug-predictor-service/`
- Acts as the computation engine and data logger.
- Responsibilities:
  - Calculates bug probability based on LOC
  - Logs all computations into the database

### 🗄️ Database (PostgreSQL – Port 5432)
- Configuration in: `database/`
- Ensures persistent storage of:
  - Analyzed lines of code
  - Bug rates
  - Critical errors
- Main table: `bug_logs`

---

## 🐳 Docker Hub Images

The system is distributed using the following Docker images:

- `amirdj/caffeine_front`
- `amirdj/caffeine_meter`
- `amirdj/bug_predictor`

---

## 🛠️ Key Technologies

### 🔄 Orchestration & Containerization
- Docker
- Kubernetes (Minikube)

### ☁️ Cloud Deployment & Infrastructure as Code
- AWS (Region: `us-east-1`)
- Terraform

### 🧩 Software Architecture
- Microservices
- Next.js (Frontend)
- Node.js / Express (Backend)

### 🗃️ Database
- PostgreSQL

### 🌐 Network & Gateway
- Nginx Reverse Proxy (AWS)
- Kubernetes Ingress Controller

---

## 🚀 Running the Project

### 1. 🧪 Local Deployment (Minikube)

Start the cluster:

```bash
minikube start
```

Deploy the database:

```bash
kubectl apply -f database/postgres-deployment.yaml
kubectl apply -f database/postgres-service.yaml
```

Deploy backend services:

```bash
kubectl apply -f caffeine-meter/deployment.yaml
kubectl apply -f caffeine-meter/service.yaml

kubectl apply -f bug-predictor-service/deployment.yaml
kubectl apply -f bug-predictor-service/service.yaml
```

Deploy frontend:

```bash
kubectl apply -f caffeine-frontend/frontend-k8s.yaml
```

Apply ingress configuration:

```bash
kubectl apply -f caffeine-meter/ingress.yaml
```

---

### 2. ☁️ Cloud Deployment (AWS + Terraform)

Navigate to Terraform directory:

```bash
cd aws-terraform/
```

Initialize Terraform:

```bash
terraform init
```

Provision infrastructure:

```bash
terraform apply
```

This will create an AWS `t3.micro` instance.

---

## 🌐 Gateway Pattern (Cloud)

An **Nginx Reverse Proxy** is configured on the AWS instance:

- Requests to `/api` → routed to **Caffeine Meter (Port 3001)**
- All other requests → routed to **Frontend (Port 8080)**

This architecture mimics Kubernetes Ingress behavior, ensuring:

- Clean API routing
- No exposure of internal service ports
- Improved security and abstraction

---

## 👨‍💻 Author

**Amir Djelidi**

