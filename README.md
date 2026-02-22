# TrewMonitor Landing Page

A high-conversion, dark-themed landing page for TrewMonitor - a grid bot monitoring application.

## 🎨 Design

- **Theme**: Dark fintech-SaaS aesthetic
- **Primary Color**: Deep charcoal (#1a1a1a)
- **Accent Color**: Teal glow (#00D9FF)
- **Typography**: Inter font family
- **Responsive**: Mobile-first design

## 📁 Project Structure

```
trewmonitor_landing/
├── index.html          # Main landing page
├── css/
│   └── styles.css      # Custom styles (glow effects, animations)
├── js/
│   └── carousel.js     # Touch-friendly carousel with glow effects
├── images/             # Local images (if any)
├── docker/
│   ├── Dockerfile      # Nginx-based container
│   ├── docker-compose.yml
│   └── nginx.conf      # Production nginx config
└── README.md
```

## 🚀 Local Development

### Option 1: Python HTTP Server

```bash
cd trewmonitor_landing
python3 -m http.server 8080
```

Open http://localhost:8080 in your browser.

### Option 2: Node.js (npx serve)

```bash
cd trewmonitor_landing
npx serve .
```

### Option 3: Docker

```bash
cd trewmonitor_landing
docker-compose -f docker/docker-compose.yml up --build
```

Open http://localhost in your browser.

## 🐳 Docker Deployment

### Build the Image

```bash
cd trewmonitor_landing
docker build -t trewmonitor-landing -f docker/Dockerfile .
```

### Run the Container

```bash
docker run -d -p 80:80 --name trewmonitor-landing trewmonitor-landing
```

### Using Docker Compose

```bash
cd trewmonitor_landing
docker-compose -f docker/docker-compose.yml up -d
```

## 🌐 Deploy to Hostinger VPS

### Prerequisites

1. SSH access to your VPS
2. Docker and Docker Compose installed on VPS
3. Domain (trewmonitor.tech) pointed to VPS IP

### Deployment Steps

#### 1. Push to GitHub (Optional)

```bash
cd trewmonitor_landing
git init
git add .
git commit -m "Initial commit - TrewMonitor landing page"
git remote add origin https://github.com/yourusername/trewmonitor-landing.git
git push -u origin main
```

#### 2. Transfer Files to VPS

**Option A: Using Git**
```bash
ssh user@your-vps-ip
git clone https://github.com/yourusername/trewmonitor-landing.git
cd trewmonitor-landing
```

**Option B: Using SCP**
```bash
scp -r trewmonitor_landing/ user@your-vps-ip:~/
```

#### 3. Deploy on VPS

```bash
ssh user@your-vps-ip
cd trewmonitor-landing
docker-compose -f docker/docker-compose.yml up -d --build
```

#### 4. Configure SSL (Recommended)

For HTTPS, add Certbot/Let's Encrypt:

```bash
# Install certbot
sudo apt update
sudo apt install certbot

# Get certificate
sudo certbot certonly --standalone -d trewmonitor.tech -d www.trewmonitor.tech
```

Then update nginx.conf to include SSL configuration.

### Updating the Site

```bash
ssh user@your-vps-ip
cd trewmonitor-landing
git pull  # or upload new files
docker-compose -f docker/docker-compose.yml down
docker-compose -f docker/docker-compose.yml up -d --build
```

## 📱 Features

- **Interactive Carousel**: Touch-friendly with swipe gestures
- **Glow Effects**: Teal glow follows each phone mockup
- **Smooth Animations**: Scroll-triggered animations for feature cards
- **Responsive Design**: Works on all screen sizes
- **Performance Optimized**: Gzip compression, asset caching
- **SEO Ready**: Proper meta tags and semantic HTML

## 🔗 Links

- Landing Page: https://trewmonitor.tech
- Web App: https://app.trewmonitor.tech

## 📄 License

© 2026 TrewMonitor. All rights reserved.