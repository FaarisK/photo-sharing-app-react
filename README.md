npm i @tanstack/react-query
npm i @tanstack/react-query-devtools
npm install express-session
npm install bcrypt

❗ Rule 1: NO committing directly to main

You must NOT do this:

git push origin main   ❌

Instead:

git checkout -b feature/auth-backend

❗ Rule 2: Use feature branches

Examples:

feature/auth-backend
feature/login-ui
feature/tanstack-query
feature/comments
❗ Rule 3: Use Pull Requests (PRs)

Workflow:

Create branch
Make changes
Push branch
Open PR on GitHub
Partner reviews + approves
Merge into main
❗ Rule 4: BOTH partners must contribute

The grader will check:

commit history
PRs
authors

If one person barely commits → they lose points

❗ Rule 5: Each partner needs at least 2 PRs

So minimum:

You: 2 PRs
Partner: 2 PRs
❗ Rule 6: Meaningful commits

BAD:

fix
stuff
asdf
