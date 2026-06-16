# ShopNow | Premium E-Commerce Website & DevOps Architecture

ShopNow is a production-grade demonstration project that showcases a modern, responsive React single-page e-commerce application paired with containerized deployment, CI/CD automation, Kubernetes scheduling, Helm templating, and Prometheus/Grafana infrastructure monitoring.

---

## 🏗️ System Architecture

The workflow details the path from initial code commit by the developer, through continuous integration and deployment, and finally, cluster scheduling and monitoring:

```mermaid
graph TD
    Developer[👨‍💻 Developer] -->|1. git push| GitHub[📁 GitHub Repository]
    
    subgraph CI/CD Pipeline (GitHub Actions)
        GitHub -->|2. Webhook Trigger| GHA[🛠️ GitHub Actions]
        GHA -->|3. PR Verification: Lint, Test, Build| LintTest[🛡️ pr-checks.yml]
        GHA -->|4. Merge Release| Release[🚀 release.yml]
        Release -->|5. Docker Multi-stage Build| DockerBuild[🐳 Docker Build]
    end

    DockerBuild -->|6. Push Tagged Images| DockerHub[📦 Docker Hub]

    subgraph Cloud Cluster (Kubernetes / Helm)
        K8s[☸️ Kubernetes Cluster] -->|7. Pull Image| DockerHub
        K8s -->|8. Expose Host shopnow.local| Ingress[🌐 Nginx Ingress Controller]
        Ingress -->|9. Route Web Traffic| Service[🔌 ClusterIP Service]
        Service -->|10. Distribute Load| Pods[👥 React App Pods x2]
    end

    subgraph Monitoring Stack (Prometheus & Grafana)
        Prometheus[🔥 Prometheus Server] -->|11. Scrape Pod Metrics| Pods
        Grafana[📊 Grafana Server] -->|12. Query Data & Alerts| Prometheus
        Grafana -->|13. Dashboards View| Operator[👷 DevOps Engineer]
    end
```

---

## 📁 Repository Structure

The project code is structured as follows:

```
shopnow-devops/
├── .github/workflows/          # CI/CD pipelines
│   ├── pr-checks.yml           # Verifies PRs (lint, test, build)
│   └── release.yml             # Builds & pushes Docker image to Docker Hub
├── docker/                     # Docker container configuration
│   ├── Dockerfile              # Multi-stage production build
│   └── nginx.conf              # Custom Nginx configurations for React Routing
├── frontend/                   # React web application
│   ├── public/                 # Static assets
│   │   └── data/
│   │       └── products.json   # Local dummy products data
│   ├── src/                    # Source code
│   │   ├── components/         # Common UI layout components
│   │   ├── context/            # React Cart State Context
│   │   ├── pages/              # Application pages
│   │   ├── App.css
│   │   ├── App.jsx             # Main Application routing config
│   │   ├── index.css           # Custom CSS styling tokens
│   │   └── main.jsx            # React Hydration entry
│   ├── package.json
│   └── vite.config.js
├── helm/                       # Helm Kubernetes packaging
│   └── shopnow/
│       ├── Chart.yaml          # Helm Chart metadata
│       ├── values.yaml         # Configurable release values
│       └── templates/          # Parameterized manifests
├── kubernetes/                 # Raw Kubernetes manifests
│   ├── namespace.yaml
│   ├── configmap.yaml
│   ├── deployment.yaml
│   ├── service.yaml
│   └── ingress.yaml
├── monitoring/                 # Monitoring configurations
│   ├── prometheus-configmap.yaml
│   ├── prometheus-deployment.yaml
│   └── grafana-dashboard.json  # Dashboard JSON definitions
├── docker-compose.yml          # Local orchestration (Dev/Prod modes)
└── README.md                   # Setup guide (This file)
```

---

## 🚀 Getting Started

### 1. Local Development (No Docker)
To run the React application locally with Hot-Module Replacement (HMR):
```bash
# Navigate to the frontend directory
cd frontend

# Install package dependencies
npm install

# Run the local Vite server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

### 2. Orchestrated Local Development (Docker Compose)
We provide a `docker-compose.yml` to run the application locally inside containerized environments:

#### Run Development (Hot Reloading via Volume mounts):
```bash
docker-compose up frontend-dev
```
* Access port: `3000`

#### Run Production Preview (Builds production Nginx image):
```bash
docker-compose up --build frontend-prod
```
* Access port: `8080`

---

## 🐳 Docker Deployment

The production build uses a **multi-stage build process** to minimize final image size:
1. **Stage 1 (Node Builder)**: Uses `node:22-alpine` to install dependencies and compile the production build (`npm run build`).
2. **Stage 2 (Nginx Runner)**: Uses `nginx:1.25-alpine`. Copies the built React output from Stage 1 into the Nginx public HTML folder (`/usr/share/nginx/html`) and loads a custom `nginx.conf` that handles React routing fallbacks.

To build and run the Docker image manually:
```bash
# Build the image from the shopnow-devops/ root directory
docker build -f docker/Dockerfile -t shopnow-frontend:1.0.0 .

# Run the container exposing port 80 to localhost:8080
docker run -d -p 8080:80 --name shopnow-app shopnow-frontend:1.0.0
```

---

## ☸️ Kubernetes Deployment

Raw Kubernetes manifests are located in `/kubernetes`.

### Steps to Deploy:
```bash
# Create the dedicated namespace
kubectl apply -f kubernetes/namespace.yaml

# Apply the ConfigMap variables
kubectl apply -f kubernetes/configmap.yaml

# Deploy the replica pods
kubectl apply -f kubernetes/deployment.yaml

# Expose the deployment via Service
kubectl apply -f kubernetes/service.yaml

# Create the Ingress rules
kubectl apply -f kubernetes/ingress.yaml
```

> [!TIP]
> Ensure you mapping `shopnow.local` to your local loopback IP in your `/etc/hosts` file (or `C:\Windows\System32\drivers\etc\hosts` on Windows):
> ```text
> 127.0.0.1 shopnow.local
> ```

---

## ⛵ Helm Deployment

For automated packaging, configurations have been templatized into a Helm chart under `helm/shopnow`.

### Verify templates:
```bash
helm lint helm/shopnow
```

### Dry Run / Preview resource creation:
```bash
helm install shopnow ./helm/shopnow --dry-run --debug -n shopnow
```

### Install/Upgrade Release:
```bash
helm upgrade --install shopnow ./helm/shopnow \
  --namespace shopnow \
  --create-namespace \
  --set replicaCount=3 \
  --set image.tag="latest"
```

---

## 📈 Monitoring Stack

Prometheus and Grafana configurations are in `/monitoring`.

### 1. Deploy Prometheus Server:
```bash
# Deploy prometheus configuration and storage pods
kubectl apply -f monitoring/prometheus-configmap.yaml
kubectl apply -f monitoring/prometheus-deployment.yaml
```

### 2. Configure Grafana Dashboard:
1. Open your Grafana console instance.
2. Navigate to **Data Sources** -> Add **Prometheus** -> Set URL to `http://prometheus-service.shopnow.svc.cluster.local` (or standard endpoint in your namespace).
3. Select **Dashboards** -> **Import**.
4. Upload `/monitoring/grafana-dashboard.json` or copy-paste the raw JSON text.
5. You will see a dashboard loaded containing panel visualizations for:
   * **Deployment Health Status**: dynamic availability ratio.
   * **Ready/Desired Pod replicas**.
   * **Total Container Restarts**.
   * **CPU utilization** (per-pod timeline).
   * **Memory utilization** (per-pod timeline).

---

## ⚙️ CI/CD Workflows (GitHub Actions)

### 1. Pull Request Verification (`pr-checks.yml`)
* **Trigger**: Any pull request targeting branch `main` modifying files under `frontend/` or `docker/`.
* **Execution**:
  * Check out target branch code.
  * Initialize Node runtime.
  * Install dependencies (`npm install`).
  * Run ESLint check (`npm run lint`).
  * Exec dummy test script (`npm run test`).
  * Verify the package build (`npm run build`).

### 2. Production Build and Release (`release.yml`)
* **Trigger**: Direct commit push or pull request merge into branch `main`.
* **Execution**:
  * Setup Docker Buildx context.
  * Authenticate to Docker Hub via secrets (`DOCKERHUB_USERNAME`, `DOCKERHUB_TOKEN`).
  * Compile the multi-stage Docker image.
  * Tag the compiled image with `latest` and target commit `SHA`.
  * Publish images to Docker Hub registry.
