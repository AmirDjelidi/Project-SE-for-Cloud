# ☁️ Project SE for Cloud: Caffeine-Driven Bug Predictor

[![Live Demo](https://img.shields.io/badge/Live_Demo-Online-success?style=for-the-badge)](http://184.73.140.16)
[![Infrastructure](https://img.shields.io/badge/Terraform-AWS-orange?style=for-the-badge)](aws-terraform/)
[![Architecture](https://img.shields.io/badge/Microservices-Docker-blue?style=for-the-badge)](#)

## 📖 Executive Summary
This project presents a containerized, distributed microservices system designed to estimate developer productivity (Lines of Code) and bug frequency based on daily caffeine intake. It demonstrates a complete DevOps lifecycle from local container orchestration to automated Cloud provisioning.

**🔴 Live Demo available at:** [http://184.73.140.16](http://184.73.140.16)

---

## 🏗️ System Architecture 

The application is decoupled into distinct, highly available layers:

* **🖥️ Frontend (Next.js):** A reactive UI dynamically routing API calls to prevent CORS issues.
* **⚙️ Service 1 – Caffeine Meter (Port 3001):** The primary logic orchestrator converting cups to expected Lines of Code (LOC).
* **🧠 Service 2 – Bug Predictor (Port 3002):** The computation engine assessing bug probability based on LOC complexity.
* **🗄️ Database (PostgreSQL - Port 5432):** Ensures persistent, stateful storage of all analysis logs (`bug_logs` table).
* **🌐 Gateway (Nginx):** Acts as a Reverse Proxy on the AWS instance, routing public Port 80 traffic to internal protected ports (3001, 8080).

---

## 🚀 How to Run the Project

This repository supports multiple environments to showcase both local development and production cloud deployment.

### 1. 💻 Local Development (Docker Compose) - *Recommended*
The easiest way to test the full stack locally without deploying AWS resources or Kubernetes clusters:

```bash
# 1. Clone the repository
git clone [https://github.com/AmirDjelidi/Project-SE-for-Cloud.git](https://github.com/AmirDjelidi/Project-SE-for-Cloud.git)
cd Project-SE-for-Cloud

# 2. Build and launch all 5 containers (Front, Services, DB, Nginx)
docker-compose up --build

# 3. Access the application
Open http://localhost in your browser.
```
### 2. ☁️ Cloud Production (AWS + Terraform)
The production environment is hosted on an AWS t3.micro instance.
```bash
cd aws-terraform/
terraform init
terraform apply
```
*Note: The AWS EC2 instance pulls the images directly from Docker Hub (amirdj/caffeine_front:v3, amirdj/caffeine_meter:v3, amirdj/bug_predictor:v3) and uses a host-network Docker configuration behind an Nginx gateway.*

### 3. ☸️ Alternative Local Orchestration (Kubernetes)
For orchestration grading purposes, Kubernetes manifests are provided.
```bash
minikube start
kubectl apply -f database/
kubectl apply -f bug-predictor-service/
kubectl apply -f caffeine-meter/
kubectl apply -f caffeine-frontend/
```
## 🛠️ Tech Stack & DevOps Tools
* Infrastructure as Code: Terraform
* Cloud Provider: AWS (EC2, Security Groups)

* Orchestration: Docker Compose, Kubernetes (Minikube)

* Backend: Node.js, Express, PostgreSQL

* Frontend: Next.js, Tailwind CSS

* Networking: Nginx Reverse Proxy
##
### 👨‍💻 Author: Amir Djelidi
