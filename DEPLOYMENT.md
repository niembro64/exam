# Pirate Crew MERN App - AWS EC2 Deployment Guide

Complete guide to deploy this MERN stack application on AWS EC2 with Cloudflare for HTTPS.

## 🔒 Security Model: No MongoDB Passwords Required

**This deployment guide uses NO MongoDB authentication (no passwords).**

### Why No Passwords Are Needed

This is a **secure deployment** using network isolation instead of database passwords:

**Architecture:**
```
Internet → Cloudflare (HTTPS) → EC2 Instance
                                    ├── Nginx (port 80) - serves React
                                    ├── Backend (port 9000) - internal only
                                    └── MongoDB (port 27017) - localhost only ✅
```

**Three Layers of Security:**
1. **MongoDB Binding**: Listens ONLY on `127.0.0.1` (localhost)
   - External connections are technically impossible
   - Only processes on the same server can connect

2. **AWS Firewall**: Security Group blocks port 27017
   - Internet traffic cannot reach MongoDB
   - Only HTTP/HTTPS ports exposed to public

3. **Single-Application Server**: One app, one database, one server
   - No multi-tenant concerns
   - Application and data isolated on dedicated instance

**Connection String:**
```javascript
mongodb://localhost:27017/assignment_exam
// No username, no password, completely secure via network isolation
```

This is **industry-standard practice** for:
- Single-application deployments
- Internal applications
- Development/staging environments
- Small to medium production apps

**You ONLY need MongoDB passwords if:**
- MongoDB exposed to external network (we're NOT doing this)
- Multiple applications sharing one database server (we're NOT doing this)
- Regulated industries (HIPAA, PCI-DSS) require it (check your requirements)
- Multiple developers with direct database access (they'll use your backend API)

---

## Prerequisites

- AWS Account with EC2 access
- Domain name configured with Cloudflare
- SSH key pair for EC2 access
- Git repository with your code
- Basic understanding that MongoDB authentication is optional

---

## Part 1: AWS EC2 Setup

### 1.1 Launch EC2 Instance

1. **Login to AWS Console** → Navigate to EC2

2. **Launch Instance:**
   - **Name:** `pirate-crew-app`
   - **AMI:** Ubuntu Server 22.04 LTS (Free tier eligible)
   - **Instance type:** t2.micro (1GB RAM) or t2.small (2GB RAM recommended)
   - **Key pair:** Create or select existing key pair
   - **Network settings:**
     - Allow SSH (port 22) from your IP
     - Allow HTTP (port 80) from anywhere (0.0.0.0/0)
     - Allow HTTPS (port 443) from anywhere (0.0.0.0/0)
     - Allow Custom TCP (port 3000) from anywhere (for React dev server - optional)
   - **Storage:** 20 GB gp3

3. **Launch instance** and note the Public IPv4 address

### 1.2 Allocate Elastic IP (Optional but Recommended)

```bash
# In AWS Console:
# EC2 → Elastic IPs → Allocate Elastic IP address
# Actions → Associate Elastic IP address → Select your instance
```

### 1.3 Connect to EC2 Instance

```bash
# Change permission on your key
chmod 400 your-key.pem

# SSH into instance
ssh -i your-key.pem ubuntu@your-ec2-public-ip
```

---

## Part 2: Server Initial Setup

### 2.1 Update System

```bash
sudo apt update && sudo apt upgrade -y
```

### 2.2 Install Node.js using NVM (v18 LTS)

```bash
# Install NVM (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Load NVM into current session
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

# Verify NVM installation
nvm --version

# Install Node.js 18 LTS
nvm install 18

# Set Node.js 18 as default
nvm alias default 18

# Use Node.js 18
nvm use 18

# Verify installation
node -v  # Should show v18.x.x
npm -v   # Should show 9.x.x or higher

# NVM will automatically activate on new terminal sessions
```

**Benefits of using NVM:**
- Easy to switch between Node.js versions
- No need for sudo when installing global packages
- Can test your app with different Node versions
- Easy to update Node.js: `nvm install 20 && nvm use 20`

### 2.3 Install MongoDB (No Password/Authentication Required)

```bash
# Import MongoDB public GPG key
curl -fsSL https://www.mongodb.org/static/pgp/server-6.0.asc | sudo gpg -o /usr/share/keyrings/mongodb-server-6.0.gpg --dearmor

# Create list file for MongoDB
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-6.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# Update package database
sudo apt-get update

# Install MongoDB
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod

# Verify MongoDB is running
sudo systemctl status mongod

# Check MongoDB version
mongod --version
```

**📝 About MongoDB Authentication (No Password Setup):**

By default, MongoDB installs **WITHOUT authentication enabled**. This means:

✅ **What this allows:**
- Any process on the EC2 instance can connect to MongoDB without credentials
- Your Node.js backend connects using: `mongodb://localhost:27017/assignment_exam`
- No username or password needed in connection string
- Simpler setup and deployment

🔒 **Security considerations:**

**This is SECURE when:**
- MongoDB is bound to `localhost` (127.0.0.1) only - DEFAULT behavior
- Only processes running ON the EC2 instance can access MongoDB
- Your EC2 security group does NOT expose port 27017 to the internet
- Only your backend application (running on same server) connects to MongoDB

**How it's protected:**
- MongoDB default config binds to `127.0.0.1` (localhost only)
- This means MongoDB ONLY accepts connections from the same machine
- External attackers CANNOT connect to MongoDB from the internet
- Your backend running on the same EC2 instance CAN connect without issues

**When you SHOULD add authentication:**
- If MongoDB is exposed to external IPs (NOT our setup)
- If multiple applications/users share the same server
- If you're handling highly sensitive data (financial, healthcare, PII)
- If compliance/regulations require it (HIPAA, PCI-DSS, SOC 2, etc.)

**When you DON'T need authentication (this guide):**
- Single application on dedicated EC2 instance (our case)
- MongoDB only accessible via localhost (our case)
- Port 27017 NOT exposed in security group (our case)
- Application and database on same server (our case)

**Verification that MongoDB is localhost-only:**
```bash
# After MongoDB is installed, check the binding:
sudo cat /etc/mongod.conf | grep bindIp
# Should show: bindIp: 127.0.0.1

# This means MongoDB ONLY listens on localhost
# External connections are IMPOSSIBLE even without authentication
```

**Bottom line:** For a single MERN app on EC2 with MongoDB on localhost, **no authentication is perfectly acceptable** and commonly used in production for internal applications.

### 2.4 Install PM2 (Process Manager)

```bash
# With NVM, no sudo needed for global packages
npm install -g pm2

# Verify installation
pm2 -v
```

### 2.5 Install Nginx (Reverse Proxy)

```bash
sudo apt install nginx -y

# Start Nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Check status
sudo systemctl status nginx
```

### 2.6 Install Git

```bash
sudo apt install git -y

# Verify
git --version
```

---

## Part 3: Configure API URLs for Production

### 3.1 Update API Configuration

**CRITICAL:** Before deploying, you must configure the frontend to use the correct backend URL.

Your application includes an intelligent API configuration system in `/client/src/config/api.js` that automatically detects whether it's running locally or in production:

```javascript
// Local development: http://localhost:9000
// Production: https://your-production-backend-url.com
```

**Update the production API URL:**

```bash
# Edit the API configuration file (on your local machine before pushing)
nano /path/to/exam/client/src/config/api.js

# Change line 11 from:
return 'https://pirates-api.niemo.io';

# To your actual deployed domain (examples):
return 'https://pirates.yourdomain.com';  # If frontend and backend share domain
# OR
return 'https://api.yourdomain.com';      # If using separate subdomain for API
# OR
return 'http://your-ec2-ip';              # If using direct IP (not recommended)
```

**How it works:**
- **Development** (`localhost:3000`): Calls `http://localhost:9000` (your local backend)
- **Production** (`yourdomain.com`): Calls the URL you specify (your EC2 backend)

This ensures:
- ✅ Localhost development uses local backend
- ✅ Production site uses production backend
- ✅ Separate databases for dev and production
- ✅ No hardcoded URLs in your components

**After updating:**
```bash
# Commit the change
git add client/src/config/api.js
git commit -m "Configure production API URL"
git push origin master
```

### 3.2 Nginx Configuration for API Routing

Your Nginx configuration will proxy `/api/*` requests to the backend:

```nginx
# This goes in your nginx config (shown in Part 6)
location /api {
    proxy_pass http://localhost:9000;
    # ... proxy headers ...
}
```

This means:
- **Frontend requests**: `https://yourdomain.com/api/pirate/`
- **Nginx proxies to**: `http://localhost:9000/api/pirate/`
- **Your API config**: Uses `https://yourdomain.com` (same domain as frontend)

**If using same domain for frontend and backend (recommended):**
```javascript
// client/src/config/api.js
return 'https://pirates.yourdomain.com';  // No /api path needed
```

**If using separate subdomain for API:**
```javascript
// client/src/config/api.js
return 'https://api.yourdomain.com';  // Backend on separate subdomain

// You'll need additional Cloudflare/Nginx config for api.yourdomain.com
```

---

## Part 4: Deploy Application

### 4.1 Clone Repository

```bash
# Navigate to web directory
cd /home/ubuntu

# Clone your repository
git clone https://github.com/niembro64/exam.git
cd exam

# If private repo, you'll need to setup SSH keys or use token
```

### 3.2 Setup Backend (No Password Required)

```bash
cd /home/ubuntu/exam/backend

# Install dependencies
npm install

# Create production environment file (optional)
cat > .env << EOF
NODE_ENV=production
PORT=9000
MONGODB_URI=mongodb://localhost:27017/assignment_exam
EOF
```

**📝 MongoDB Connection String Breakdown (No Authentication):**

Your connection string: `mongodb://localhost:27017/assignment_exam`

**What each part means:**
- `mongodb://` - Protocol (MongoDB connection)
- `localhost` - Hostname (same machine, 127.0.0.1)
- `27017` - Port (MongoDB default port)
- `assignment_exam` - Database name

**What's NOT in the connection string:**
- ❌ No `username` - Authentication disabled
- ❌ No `password` - Authentication disabled
- ❌ No `authSource` - Authentication disabled
- ✅ This is perfectly valid and secure for localhost-only MongoDB

**If authentication was enabled, it would look like:**
```
mongodb://username:password@localhost:27017/assignment_exam?authSource=admin
```
But we're NOT using that - we're using the simpler no-auth version.

**⚠️ IMPORTANT: DO NOT modify `mongoose.config.js`!**

Your existing `backend/server/config/mongoose.config.js` file is **ALREADY CONFIGURED** for no-password deployment:

```javascript
// This code works on BOTH WSL2 (local dev) and EC2 (production)
const mongoUrl = `mongodb://${mongoHost}:27017/assignment_exam`;
```

**How it works:**
1. **Local WSL2**: Detects Windows host IP from `/etc/resolv.conf` (172.x.x.x)
2. **EC2 Ubuntu**: Falls back to `127.0.0.1` (no resolv.conf with nameserver)
3. **Both cases**: Connects WITHOUT username/password
4. **No changes needed**: Deploy the file as-is to EC2

**Connection behavior on EC2:**
```javascript
mongoHost = "127.0.0.1"  // Automatic on native Linux
const mongoUrl = `mongodb://127.0.0.1:27017/assignment_exam`
// Connects successfully with no authentication
```

### 3.3 Build React Frontend

```bash
cd /home/ubuntu/exam/client

# Install dependencies
npm install

# Build for production
npm run build

# The build folder will be served by Nginx
```

---

## Part 4: MongoDB Authentication Configuration

# ⚠️⚠️⚠️ SKIP THIS ENTIRE SECTION FOR NO-PASSWORD DEPLOYMENT ⚠️⚠️⚠️

**THIS GUIDE ASSUMES NO MONGODB AUTHENTICATION (NO PASSWORDS).**

---

## 🚫 DO NOT PROCEED WITH PART 4 - READ THIS INSTEAD:

### Why We're Skipping Authentication

**Our deployment uses NO MongoDB authentication. Here's why this is acceptable:**

1. **Network Isolation**
   - MongoDB is bound to `localhost` (127.0.0.1) ONLY
   - No external network access to MongoDB is possible
   - Only processes on the EC2 instance can connect
   - Internet traffic CANNOT reach MongoDB directly

2. **Firewall Protection**
   - EC2 Security Group does NOT allow port 27017 from internet
   - Only ports 80 (HTTP), 443 (HTTPS), and 22 (SSH) are open
   - MongoDB port 27017 is CLOSED to external traffic
   - Even if someone tried, they cannot connect from outside

3. **Single Application Architecture**
   - One app (your backend) on one server
   - No other applications or users accessing MongoDB
   - No multi-tenant concerns
   - Simpler deployment and maintenance

4. **Industry Standard Practice**
   - Common for internal/single-app deployments
   - Used by many production applications
   - Authentication primarily needed for multi-user/multi-app scenarios
   - OR when MongoDB exposed to network (not our case)

### What Happens Without Authentication

**Your application will:**
- ✅ Connect successfully: `mongodb://localhost:27017/assignment_exam`
- ✅ Perform all CRUD operations (Create, Read, Update, Delete)
- ✅ Work identically to authenticated setup from app perspective
- ✅ Be protected by network isolation (localhost-only binding)
- ✅ Be protected by firewall (port 27017 not exposed)

**What MongoDB allows:**
- ✅ Any process ON the EC2 instance can connect
- ✅ Full read/write access to all databases
- ❌ External connections are IMPOSSIBLE (bound to localhost)
- ❌ Internet traffic CANNOT reach MongoDB (firewall blocked)

### Security Through Network Isolation

```
                      INTERNET
                         |
                         | ❌ Port 27017 BLOCKED by Security Group
                         |
                    [Cloudflare]
                         |
                         | ✅ Ports 80/443 allowed (HTTPS)
                         |
                    [EC2 Instance]
                         |
        +----------------+------------------+
        |                |                  |
   [Nginx:80]    [Backend:9000]    [MongoDB:27017]
        |                |                  |
        |                +------------------+
        |             ✅ localhost         |
        |             connection allowed   |
        |                                  |
        +----------------------------------+
                    ❌ External access
                    to MongoDB IMPOSSIBLE
```

**Three layers of protection WITHOUT passwords:**
1. **Binding**: MongoDB only listens on 127.0.0.1 (localhost)
2. **Firewall**: AWS Security Group blocks port 27017 from internet
3. **Architecture**: Application and database on same isolated server

### When You WOULD Need Authentication

❌ **You DON'T need it if:** (your case)
- Single MERN app on dedicated server
- MongoDB bound to localhost
- Port 27017 not exposed in security group

✅ **You WOULD need it if:** (not your case)
- MongoDB exposed to external IPs/network
- Multiple applications sharing MongoDB
- Multiple developers with direct DB access
- Handling regulated data (HIPAA, PCI-DSS, etc.)
- Company policy requires it
- MongoDB cluster across multiple servers

### Verification Steps on EC2

After deployment, verify MongoDB is properly secured:

```bash
# 1. Check MongoDB is bound to localhost only
sudo cat /etc/mongod.conf | grep bindIp
# Expected output: bindIp: 127.0.0.1

# 2. Check MongoDB is NOT listening on external IPs
sudo netstat -tlnp | grep 27017
# Expected: 127.0.0.1:27017 (NOT 0.0.0.0:27017)

# 3. Verify Security Group doesn't expose MongoDB
# In AWS Console: EC2 → Security Groups → Check Inbound Rules
# Should NOT have: Port 27017 from 0.0.0.0/0

# 4. Test connection from application works
pm2 logs pirate-backend
# Expected: "Established a connection to the assignment_exam DB"
```

### The Bottom Line

**For this deployment guide:**
- ❌ NO MongoDB authentication/passwords needed
- ❌ NO changes to mongoose.config.js needed
- ❌ NO database users to create
- ❌ DO NOT enable authorization in mongod.conf
- ✅ Deploy as-is with no password configuration
- ✅ MongoDB secured by localhost binding + firewall
- ✅ Standard practice for single-app deployments

**PROCEED DIRECTLY TO PART 5 (Configure PM2)**

---

<details>
<summary><b>⚠️ ADVANCED USERS ONLY: Click here if you want to enable authentication anyway (NOT RECOMMENDED for this setup)</b></summary>

### Why This Section Exists

This section is included for:
- Users with specific security requirements
- Compliance-driven deployments
- Learning purposes
- Multi-application servers

**If you're following this guide for a standard deployment, you should NOT use this section.**

### 4.1 Create MongoDB Users

```bash
# Connect to MongoDB
mongosh

# Switch to admin database
use admin

# Create admin user
db.createUser({
  user: "admin",
  pwd: "your-strong-password-here",
  roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
})

# Create app-specific user
use assignment_exam
db.createUser({
  user: "pirateapp",
  pwd: "another-strong-password",
  roles: [ { role: "readWrite", db: "assignment_exam" } ]
})

# Exit mongosh
exit
```

### 4.2 Enable MongoDB Authentication

```bash
# Edit MongoDB config
sudo nano /etc/mongod.conf

# Add or uncomment security section:
security:
  authorization: enabled

# Save and exit (Ctrl+X, Y, Enter)

# Restart MongoDB
sudo systemctl restart mongod

# Verify it's running
sudo systemctl status mongod
```

### 4.3 Update Backend Config with Credentials

**⚠️ ONLY IF YOU COMPLETED 4.1 AND 4.2!**

```bash
# Edit backend mongoose config
nano /home/ubuntu/exam/backend/server/config/mongoose.config.js

# Find this line:
const mongoUrl = `mongodb://${mongoHost}:27017/assignment_exam`;

# Replace with (use your actual password from step 4.1):
const mongoUrl = `mongodb://pirateapp:another-strong-password@${mongoHost}:27017/assignment_exam`;

# Save and exit (Ctrl+X, Y, Enter)

# Restart backend
pm2 restart pirate-backend
```

**Note:** You've now added complexity without meaningful security benefit for this single-app architecture. The network isolation already provided equivalent protection.

</details>

---

## Part 5: Configure PM2

### 5.1 Create PM2 Ecosystem File

```bash
cd /home/ubuntu/exam

# Create ecosystem.config.js
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [
    {
      name: 'pirate-backend',
      cwd: '/home/ubuntu/exam/backend',
      script: 'server.js',
      instances: 1,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 9000
      },
      error_file: '/home/ubuntu/exam/logs/backend-error.log',
      out_file: '/home/ubuntu/exam/logs/backend-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      time: true
    }
  ]
};
EOF

# Create logs directory
mkdir -p /home/ubuntu/exam/logs
```

### 5.2 Start Application with PM2

```bash
cd /home/ubuntu/exam

# Start the backend
pm2 start ecosystem.config.js

# Check status
pm2 status

# View logs
pm2 logs pirate-backend

# To stop watching logs, press Ctrl+C

# Save PM2 configuration
pm2 save

# Setup PM2 to start on system boot
pm2 startup
# Copy and run the command it outputs (will be something like):
# sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u ubuntu --hp /home/ubuntu
```

### 5.3 PM2 Useful Commands

```bash
# View all running apps
pm2 list

# Monitor resources
pm2 monit

# View specific app logs
pm2 logs pirate-backend

# Restart app
pm2 restart pirate-backend

# Stop app
pm2 stop pirate-backend

# Delete app from PM2
pm2 delete pirate-backend

# Restart all apps
pm2 restart all

# View detailed info
pm2 show pirate-backend
```

---

## Part 6: Configure Nginx

### 6.1 Create Nginx Configuration

```bash
# Create new site configuration
sudo nano /etc/nginx/sites-available/pirate-crew
```

Paste this configuration:

```nginx
server {
    listen 80;
    listen [::]:80;

    server_name your-domain.com www.your-domain.com;

    # Serve React build files
    root /home/ubuntu/exam/client/build;
    index index.html;

    # React Router - serve index.html for all routes
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Proxy API requests to backend
    location /api {
        proxy_pass http://localhost:9000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript
               application/x-javascript application/xml+rss
               application/javascript application/json;
}
```

### 6.2 Enable Site

```bash
# Enable the site
sudo ln -s /etc/nginx/sites-available/pirate-crew /etc/nginx/sites-enabled/

# Remove default site
sudo rm /etc/nginx/sites-enabled/default

# Test Nginx configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx

# Check status
sudo systemctl status nginx
```

---

## Part 7: Configure Cloudflare

### 7.1 Setup DNS in Cloudflare

1. **Login to Cloudflare** → Select your domain

2. **DNS Settings:**
   - **Add A Record:**
     - Type: `A`
     - Name: `@` (or subdomain like `pirates`)
     - IPv4 address: Your EC2 Public IP or Elastic IP
     - Proxy status: **Proxied** (orange cloud)
     - TTL: Auto

   - **Add A Record for www (optional):**
     - Type: `A`
     - Name: `www`
     - IPv4 address: Same as above
     - Proxy status: **Proxied**
     - TTL: Auto

### 7.2 Configure SSL/TLS Settings

1. **SSL/TLS Tab → Overview:**
   - Encryption mode: **Flexible** (Cloudflare to visitor uses HTTPS, Cloudflare to origin uses HTTP)
   - OR **Full** if you want to setup SSL on your server too

2. **SSL/TLS Tab → Edge Certificates:**
   - Always Use HTTPS: **ON**
   - Automatic HTTPS Rewrites: **ON**
   - Minimum TLS Version: **TLS 1.2**

### 7.3 Configure Firewall Rules (Optional)

1. **Security Tab → WAF:**
   - Enable Web Application Firewall

2. **Create Firewall Rules** to block bad traffic

### 7.4 Configure Page Rules (Optional)

1. **Rules Tab → Page Rules:**
   - **Force HTTPS:**
     - URL: `http://*your-domain.com/*`
     - Setting: Always Use HTTPS

   - **Cache Everything:**
     - URL: `*your-domain.com/*`
     - Setting: Cache Level = Cache Everything
     - Browser Cache TTL = 4 hours

---

## Part 8: Security Hardening

### 8.1 Setup UFW Firewall

```bash
# Enable UFW
sudo ufw enable

# Allow SSH
sudo ufw allow 22/tcp

# Allow HTTP
sudo ufw allow 80/tcp

# Allow HTTPS
sudo ufw allow 443/tcp

# Check status
sudo ufw status

# If using Cloudflare, only allow Cloudflare IPs (advanced)
# https://www.cloudflare.com/ips/
```

### 8.2 Configure Fail2Ban (Optional)

```bash
# Install fail2ban
sudo apt install fail2ban -y

# Create local config
sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local

# Edit config
sudo nano /etc/fail2ban/jail.local

# Enable SSH protection (find [sshd] section and set enabled = true)

# Start fail2ban
sudo systemctl start fail2ban
sudo systemctl enable fail2ban
```

### 8.3 Automatic Security Updates

```bash
# Install unattended-upgrades
sudo apt install unattended-upgrades -y

# Configure
sudo dpkg-reconfigure -plow unattended-upgrades
```

---

## Part 9: Monitoring & Maintenance

### 9.1 Setup Log Rotation

```bash
# PM2 handles its own log rotation, but configure it:
pm2 install pm2-logrotate

# Configure
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
```

### 9.2 Monitor Application

```bash
# Real-time monitoring
pm2 monit

# View logs
pm2 logs

# Check system resources
htop  # Install: sudo apt install htop

# Check disk usage
df -h

# Check MongoDB status
sudo systemctl status mongod

# Check Nginx status
sudo systemctl status nginx
```

### 9.3 Backup MongoDB

```bash
# Create backup script
nano /home/ubuntu/backup-mongo.sh
```

Paste this:

```bash
#!/bin/bash
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/home/ubuntu/backups/mongo"
mkdir -p $BACKUP_DIR

# Backup without authentication (default setup)
mongodump --db assignment_exam --out $BACKUP_DIR/backup_$TIMESTAMP

# If you enabled MongoDB auth, use this instead:
# mongodump --username pirateapp --password another-strong-password --authenticationDatabase assignment_exam --db assignment_exam --out $BACKUP_DIR/backup_$TIMESTAMP

# Keep only last 7 backups
find $BACKUP_DIR -type d -mtime +7 -exec rm -rf {} +

echo "Backup completed: $BACKUP_DIR/backup_$TIMESTAMP"
```

Make it executable and schedule:

```bash
chmod +x /home/ubuntu/backup-mongo.sh

# Add to crontab (daily at 2 AM)
crontab -e

# Add this line:
0 2 * * * /home/ubuntu/backup-mongo.sh >> /home/ubuntu/logs/backup.log 2>&1
```

---

## Part 10: Deployment Updates

### 10.1 Update Application

```bash
# Navigate to project
cd /home/ubuntu/exam

# Pull latest changes
git pull origin master

# Update backend
cd backend
npm install
pm2 restart pirate-backend

# Rebuild frontend
cd ../client
npm install
npm run build

# Reload Nginx
sudo systemctl reload nginx
```

### 10.2 Zero-Downtime Deployment Script

Create this script for easier updates:

```bash
nano /home/ubuntu/deploy.sh
```

Paste:

```bash
#!/bin/bash

echo "🚀 Starting deployment..."

cd /home/ubuntu/exam

# Pull latest code
echo "📥 Pulling latest code..."
git pull origin master

# Backend
echo "🔧 Updating backend..."
cd backend
npm install

# Frontend
echo "⚛️  Building frontend..."
cd ../client
npm install
npm run build

# Restart services
echo "🔄 Restarting services..."
pm2 restart pirate-backend
sudo systemctl reload nginx

echo "✅ Deployment complete!"

# Show status
pm2 status
```

Make it executable:

```bash
chmod +x /home/ubuntu/deploy.sh

# Use it:
./deploy.sh
```

---

## Part 11: Troubleshooting

### 11.1 Check Application Logs

```bash
# Backend logs
pm2 logs pirate-backend

# Nginx error logs
sudo tail -f /var/log/nginx/error.log

# Nginx access logs
sudo tail -f /var/log/nginx/access.log

# MongoDB logs
sudo tail -f /var/log/mongodb/mongod.log
```

### 11.2 Common Issues

**Backend not starting:**
```bash
# Check PM2 logs
pm2 logs pirate-backend

# Check if port 9000 is in use
sudo lsof -i :9000

# Restart backend
pm2 restart pirate-backend
```

**MongoDB connection issues:**
```bash
# Check MongoDB status
sudo systemctl status mongod

# Restart MongoDB
sudo systemctl restart mongod

# Check MongoDB logs
sudo tail -100 /var/log/mongodb/mongod.log
```

**Nginx not serving files:**
```bash
# Test Nginx config
sudo nginx -t

# Check Nginx error log
sudo tail -50 /var/log/nginx/error.log

# Verify build files exist
ls -la /home/ubuntu/exam/client/build

# Check permissions
sudo chown -R ubuntu:ubuntu /home/ubuntu/exam
```

**502 Bad Gateway:**
```bash
# Backend not running - check PM2
pm2 status

# Restart backend
pm2 restart pirate-backend

# Check if backend is listening
curl http://localhost:9000/api
```

### 11.3 Performance Issues

```bash
# Check system resources
htop
free -h
df -h

# Check MongoDB performance
mongosh
db.currentOp()

# Check Nginx connections
sudo netstat -an | grep :80 | wc -l
```

---

## Part 12: Verification Checklist

After deployment, verify everything works:

- [ ] EC2 instance is running
- [ ] MongoDB is running: `sudo systemctl status mongod`
- [ ] MongoDB is bound to localhost only: `sudo netstat -tlnp | grep 27017` (should show 127.0.0.1)
- [ ] MongoDB has NO authentication enabled (verify in logs: no auth warnings)
- [ ] Backend is running: `pm2 status`
- [ ] Backend connects to MongoDB successfully: `pm2 logs pirate-backend` (should show connection message)
- [ ] Nginx is running: `sudo systemctl status nginx`
- [ ] DNS is pointing to EC2 IP in Cloudflare
- [ ] HTTPS is working (Cloudflare orange cloud enabled)
- [ ] Website loads at https://your-domain.com
- [ ] Can create a new pirate (tests full CRUD + MongoDB write)
- [ ] Can view pirate list (tests MongoDB read)
- [ ] Can edit/delete pirates (tests MongoDB update/delete)
- [ ] API calls work (check browser Network tab)
- [ ] No console errors (check browser console)
- [ ] MongoDB port NOT exposed: Try connecting from another machine (should fail)
- [ ] Connection string has NO password: `cat /home/ubuntu/exam/backend/server/config/mongoose.config.js`

---

## Part 13: Quick Reference Commands

```bash
# PM2
pm2 start ecosystem.config.js    # Start app
pm2 restart pirate-backend        # Restart app
pm2 logs pirate-backend           # View logs
pm2 monit                         # Monitor
pm2 status                        # Check status

# MongoDB
sudo systemctl start mongod       # Start
sudo systemctl stop mongod        # Stop
sudo systemctl restart mongod     # Restart
sudo systemctl status mongod      # Status
mongosh                           # Connect

# Nginx
sudo systemctl reload nginx       # Reload config
sudo systemctl restart nginx      # Restart
sudo nginx -t                     # Test config
sudo tail -f /var/log/nginx/error.log  # View logs

# System
sudo ufw status                   # Firewall status
htop                             # System monitor
df -h                            # Disk usage
free -h                          # Memory usage

# Deployment
cd /home/ubuntu/exam
git pull origin master
./deploy.sh                      # Auto deploy script
```

---

## Environment Variables Reference

**Backend** (`/home/ubuntu/exam/backend/.env`):
```env
NODE_ENV=production
PORT=9000
MONGODB_URI=mongodb://localhost:27017/assignment_exam
```

**📝 Note about MONGODB_URI:**
- No username or password in the connection string
- `localhost` ensures MongoDB is accessed locally only
- This is secure because MongoDB is bound to 127.0.0.1
- See "Security Summary" section above for full explanation

**If you had enabled authentication (not recommended), it would look like:**
```env
MONGODB_URI=mongodb://username:password@localhost:27017/assignment_exam
```
But we're NOT using that - the simple version above is correct.

---

## Ports Reference

- **80** - HTTP (Nginx)
- **443** - HTTPS (handled by Cloudflare)
- **9000** - Backend API (internal only, proxied by Nginx)
- **27017** - MongoDB (internal only)
- **22** - SSH

---

## Costs Estimate

- **EC2 t2.micro** - Free tier (first year) or ~$8/month
- **Elastic IP** - Free when attached, $3.60/month when detached
- **Data transfer** - First 100GB free, then $0.09/GB
- **Cloudflare** - Free plan is sufficient
- **Domain** - ~$10-15/year (varies by registrar)

**Total:** ~$8-12/month after free tier

---

## 🔐 Security Summary: Why No Passwords Works

**This deployment does NOT use MongoDB passwords. Here's the complete security picture:**

### Network Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         INTERNET                             │
│                    (Potential Attackers)                     │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ ❌ BLOCKED: Port 27017
                         │ ❌ BLOCKED: Port 9000
                         │ ✅ ALLOWED: Port 80/443 (HTTP/HTTPS)
                         │
                    ┌────▼─────┐
                    │Cloudflare│ (SSL/TLS Termination)
                    └────┬─────┘
                         │
                    ┌────▼──────────────────────────────────┐
                    │     AWS Security Group (Firewall)     │
                    │  - Port 80/443: Open to Internet      │
                    │  - Port 27017: CLOSED ❌              │
                    │  - Port 9000: CLOSED ❌               │
                    └────┬──────────────────────────────────┘
                         │
                    ┌────▼──────────────────────────────────┐
                    │         EC2 Instance (Ubuntu)         │
                    │                                       │
                    │  ┌──────────┐         ┌────────────┐ │
                    │  │  Nginx   │◄────────┤  Internet  │ │
                    │  │  :80     │         │            │ │
                    │  └────┬─────┘         └────────────┘ │
                    │       │                               │
                    │       │ Proxy /api/*                  │
                    │       │                               │
                    │  ┌────▼──────┐       ┌─────────────┐ │
                    │  │  Backend  │◄──────┤  localhost  │ │
                    │  │  :9000    │       │  only       │ │
                    │  └────┬──────┘       └─────────────┘ │
                    │       │                               │
                    │       │ mongodb://localhost:27017     │
                    │       │ (NO PASSWORD)                 │
                    │       │                               │
                    │  ┌────▼──────────┐   ┌─────────────┐ │
                    │  │   MongoDB     │◄──┤  localhost  │ │
                    │  │   :27017      │   │  127.0.0.1  │ │
                    │  │ bindIp:       │   │  ONLY       │ │
                    │  │ 127.0.0.1     │   └─────────────┘ │
                    │  └───────────────┘                   │
                    │       ▲                               │
                    │       │                               │
                    │       └─ ❌ External access           │
                    │          IMPOSSIBLE                   │
                    └───────────────────────────────────────┘
```

### Security Layers Explained

**Layer 1: MongoDB Network Binding**
```bash
# MongoDB configuration (/etc/mongod.conf)
net:
  bindIp: 127.0.0.1  # ONLY localhost
  port: 27017

# This means MongoDB literally CANNOT accept external connections
# The operating system blocks it at the network interface level
```

**Layer 2: AWS Security Group (Firewall)**
```
Inbound Rules:
- Port 22 (SSH): Your IP only
- Port 80 (HTTP): 0.0.0.0/0 ✅
- Port 443 (HTTPS): 0.0.0.0/0 ✅
- Port 27017 (MongoDB): NOT LISTED ❌ (blocked by default)
- Port 9000 (Backend): NOT LISTED ❌ (blocked by default)
```

**Layer 3: Application Architecture**
- Only your Node.js backend talks to MongoDB
- Users interact with your backend via HTTP API
- Backend validates, sanitizes, and controls all database operations
- No direct database access from internet

### Attack Vector Analysis

**Can an attacker connect to MongoDB from the internet?**
- ❌ NO - Port 27017 blocked by Security Group
- ❌ NO - Even if firewall bypassed, MongoDB bound to localhost
- ❌ NO - Would need to compromise the EC2 instance first

**If attacker compromises EC2 instance?**
- ⚠️ They could access MongoDB (with or without passwords)
- ⚠️ But they already have root access to everything
- 💡 Defense: Keep system updated, use SSH keys, fail2ban, monitoring

**What about SQL injection style attacks?**
- ✅ Protected by Mongoose schema validation
- ✅ Protected by application-level access controls
- ✅ NoSQL injection prevented by parameterized queries
- 💡 MongoDB passwords DON'T protect against injection attacks

### Comparison: With vs Without Passwords

| Scenario | Without Passwords | With Passwords |
|----------|-------------------|----------------|
| **Internet attacker tries to connect** | ❌ Blocked by firewall | ❌ Blocked by firewall |
| **Attacker bypasses firewall** | ❌ Blocked by localhost binding | ❌ Blocked by localhost binding |
| **Attacker compromises EC2 instance** | ⚠️ Can access MongoDB | ⚠️ Can read password from config files, access MongoDB |
| **Application connects to MongoDB** | ✅ Simple, no auth needed | ✅ More complex, auth required |
| **Maintenance complexity** | ✅ Simple | ❌ More complex (password rotation, etc.) |
| **Security benefit for single-app** | ✅ Equivalent | ≈ Marginal |

### Real-World Security Priorities

**Focus your security efforts on:**
1. ✅ **SSH Access**: Use SSH keys (not passwords), disable root login
2. ✅ **System Updates**: Keep Ubuntu and packages updated
3. ✅ **Application Security**: Input validation, XSS prevention, CORS
4. ✅ **SSL/TLS**: HTTPS everywhere (handled by Cloudflare)
5. ✅ **Backups**: Regular MongoDB backups (data loss prevention)
6. ✅ **Monitoring**: Watch for unusual activity (fail2ban, logs)

**Lower priority for single-app deployments:**
7. 🤷 MongoDB passwords (already secured by network isolation)

### When Passwords Actually Help

MongoDB authentication is valuable when:
- Multiple applications on same server accessing different databases
- Multiple developers with direct SSH access who might accidentally connect to wrong database
- Compliance requirements (HIPAA, PCI-DSS, SOC 2, etc.)
- MongoDB cluster with network-accessible nodes
- Defense-in-depth strategy for high-security applications

### The Professional Assessment

**Question:** "Is it unprofessional to run MongoDB without authentication?"

**Answer:** NO - It depends on your architecture.

**Industry Examples:**
- Many production startups run this way
- Docker containers often use this pattern
- Microservices with sidecar databases
- Single-purpose VMs with localhost-only databases

**Professional judgment:**
- Localhost + firewall = Strong security ✅
- Authentication adds defense-in-depth (good for high-security apps)
- Authentication NOT a substitute for network security
- Pick security measures appropriate to your threat model

### Your Deployment

**This guide's configuration:**
- ✅ Production-ready for most applications
- ✅ Secure by network isolation
- ✅ Simple to deploy and maintain
- ✅ Industry-standard for single-app servers
- ✅ Can add authentication later if needed (see Part 4)

**You can confidently deploy without MongoDB passwords.**

---

## Additional Resources

- [PM2 Documentation](https://pm2.keymetrics.io/docs/usage/quick-start/)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Cloudflare Documentation](https://developers.cloudflare.com/)
- [AWS EC2 Documentation](https://docs.aws.amazon.com/ec2/)

---

## Support

For issues specific to this deployment guide, check:
1. Application logs: `pm2 logs pirate-backend`
2. Nginx logs: `sudo tail -f /var/log/nginx/error.log`
3. MongoDB logs: `sudo tail -f /var/log/mongodb/mongod.log`

Good luck with your deployment! 🏴‍☠️
