# 🔖 Smart Bookmark App

A Smart Bookmark App built using **Next.js (App Router)**, **Supabase**, and **Tailwind CSS**.  
Users can log in using **Google OAuth**, add bookmarks, view only their own bookmarks, delete bookmarks, and see realtime updates without refreshing the page.

---

## 🚀 Live Demo

🔗 Deployed Link: https://smart-bookmark-app1-opal.vercel.app/

---

## 📌 Features

- ✅ Google Login (OAuth only)
- ✅ Add Bookmark (Title + URL)
- ✅ View Only Own Bookmarks (User-based)
- ✅ Delete Bookmarks
- ✅ Supabase Realtime Updates (Auto refresh without reload)
- ✅ Responsive UI with Tailwind CSS
- ✅ Deployed on Vercel

---

## 🛠️ Tech Stack

- **Next.js (App Router)**
- **Supabase (Auth + Database + Realtime)**
- **Tailwind CSS**
- **Google OAuth**
- **Vercel Deployment**

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/iamvishalsinghchauhan/smart-bookmark-app.git

#Challenges faced by development?
Troubleshooting Guide for Smart Bookmark App
This guide documents common issues encountered during development and deployment of the Smart Bookmark App, along with their causes and solutions. These problems cover authentication, version control, deployment, and more.


Problem 1: Google Login Error (Redirect URI Mismatch)
Error:
Error 400: redirect_uri_mismatch

Cause:
Redirect URI was not added in Google Cloud Console.

Solution:
Added Supabase callback URL in Google OAuth settings:
https://dbfuqjiiypwvnyjlxdip.supabase.co/auth/v1/callback

Saved the changes and Google login started working.

Problem 2: GitHub Remote Repository Not Found
Error:
Repository not found

Cause:
Repository was not created properly OR remote URL/repo name was incorrect.

Solution:
Created the repository on GitHub with the correct name and updated remote URL:

git remote remove origin
git remote add origin https://github.com/iamvishalsinghchauhan/smart-bookmark-app.git
git push -u origin main


Problem 3: GitHub Push Rejected (Fetch First)
Error:
Updates were rejected because the remote contains work that you do not have locally

Cause:
GitHub repository already had files (like README.md), so local and remote were not synced.

Solution:
Pulled remote changes using rebase and then pushed again:

git pull origin main --rebase
git push -u origin main

Problem 4: Git Rebase Confusion (Interactive Rebase in Progress)
Issue:
Git showed:
interactive rebase in progress

Cause:
Rebase process was incomplete and Git was waiting for conflict resolution.

Solution:
Resolved conflicts and completed rebase using:

git rebase --continue

Problem 5: Detached HEAD Issue
Error:
You are not currently on a branch

Cause:
Commit was made while rebase was running, which resulted in detached HEAD state.

Solution:
Completed the rebase process and returned to main branch:

git rebase --continue
git checkout main
git push -u origin main

Problem 6: Merge Conflict in app/page.tsx
Error:
CONFLICT (content): Merge conflict in app/page.tsx

Cause:
Both local and remote had different code in app/page.tsx.

Solution:
Manually edited app/page.tsx and removed conflict markers:

<<<<<<< HEAD
=======
>>>>>>> commit

Then resolved conflict using:

git add app/page.tsx
git rebase --continue

Problem 7: Vercel URL Not Opening for Others
Issue:
Other users got:
This site can’t be reached

Cause:
Deployment failed or Vercel build was not completed properly.

Solution:
Checked Vercel deployment logs, fixed build errors, and redeployed successfully.

Problem 8: Google Login Not Working on Vercel Deployment
Issue:
Website opened but Google login failed after deployment.

Cause:
Supabase authentication redirect URL was not configured for Vercel domain.

Solution:
Updated Supabase settings:

📌 Supabase → Authentication → URL Configuration

vercel Link: https://smart-bookmark-app1-opal.vercel.app/

