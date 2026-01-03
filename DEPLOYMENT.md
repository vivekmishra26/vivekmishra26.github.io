# 🚀 Quick Deployment Guide

## Step-by-Step GitHub Pages Deployment

### 1. Prepare Your Resume
- Create your resume as a PDF file
- Name it exactly: `resume.pdf`
- Place it in the root folder (same folder as index.html)

### 2. Create GitHub Repository

**Option A: Repository named `username.github.io` (Recommended)**
- Repository name: `your-username.github.io`
- Your site will be at: `https://your-username.github.io`

**Option B: Regular repository name**
- Repository name: `portfolio` (or any name)
- Your site will be at: `https://your-username.github.io/portfolio`

### 3. Upload Files to GitHub

**Using GitHub Web Interface:**
1. Create new repository on GitHub
2. Click "uploading an existing file"
3. Drag and drop all files:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `README.md`
   - `resume.pdf` (your actual resume)
   - `.gitignore`
4. Click "Commit changes"

**Using Git (Command Line):**
```bash
cd "/home/vivek/Documents/new portfolio"

git init
git add .
git commit -m "Initial commit: Portfolio website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
git push -u origin main
```

### 4. Enable GitHub Pages

1. Go to repository → **Settings**
2. Scroll to **Pages** (left sidebar)
3. Under **Source**: Select **Deploy from a branch**
4. Branch: **main**
5. Folder: **/ (root)**
6. Click **Save**

### 5. Wait & Access

- Wait 1-2 minutes for GitHub to build your site
- Visit: `https://your-username.github.io` (or your repo URL)
- Your portfolio is live! 🎉

## ✅ Checklist Before Deploying

- [ ] Added your actual `resume.pdf` file
- [ ] Verified all contact information in `index.html`
- [ ] Tested LinkedIn link opens correctly
- [ ] Checked all sections display properly
- [ ] Tested on mobile device (responsive design)

## 🔄 Updating Your Portfolio

After making changes:
```bash
git add .
git commit -m "Update portfolio"
git push
```

Changes will be live in 1-2 minutes!

## 📝 Notes

- GitHub Pages is **FREE** forever
- No server setup required
- Automatic HTTPS
- Custom domain support available
- Updates are instant after push

---

**Need Help?** Check the main README.md for detailed instructions.

