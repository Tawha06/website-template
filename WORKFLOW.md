🧭 TEAM GIT WORKFLOW (SAVE THIS)
📌 Rule of thumb

He makes changes → PUSH

You want to see them → PULL

GitHub is the middleman

Website updates automatically after push (GitHub Pages)

👤 WHEN HE MAKES CHANGES (HIS VS CODE)
1️⃣ Always do this first
git pull

2️⃣ Edit files in VS Code

(make changes to HTML / CSS / JS etc)

3️⃣ Check what changed
git status

4️⃣ Stage changes
git add .

5️⃣ Commit changes
git commit -m "describe what you changed"


Example:

git commit -m "updated homepage hero section"

6️⃣ Push to GitHub (THIS MAKES IT LIVE)
git push


✅ This triggers GitHub Pages
🌐 Website updates in ~1–3 minutes

👤 WHEN YOU WANT TO SEE HIS CHANGES (YOUR VS CODE)
1️⃣ Pull latest changes
git pull


That’s it.
Files update instantly in your VS Code.

🌐 HOW THE LIVE WEBSITE UPDATES
VS Code → git push → GitHub (main branch) → GitHub Pages → live site


You do not need to:

redeploy

touch settings

re-enter domain

use VS Code Web

⚠️ IMPORTANT RULE (AVOID BREAKING STUFF)

Before either of you starts working:

git pull


Always pull first.

🧪 QUICK CHECK COMMANDS
See which branch you’re on
git branch


You should see:

* main

See recent commits
git log --oneline --5

🆘 IF SOMETHING GOES WRONG
If push fails
git pull
git push

If confused or error appears

STOP

Don’t delete anything

Ask before continuing

✅ FINAL CONFIRMATION

✔ He edits + pushes
✔ You pull
✔ GitHub updates
✔ Website goes live

IF YOU WANT TO DO CHANGE DO THIS
git add . (This does the change but first do Control s on the file then write this)
git commit -m "message" (So this saves the change and you write message like i did 123)
git push (This actually send it online so you have to do it in this order)

THEN I DO
git pull (THIS UPDATES MY VS CODE)

yurdickehaed