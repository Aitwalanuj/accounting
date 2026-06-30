# How to Host This ERP from GitHub

## Option A: Simple GitHub Pages deployment

Use this if you want to upload files and run the ERP from a GitHub link.

1. Create a GitHub account or log in.
2. Click New Repository.
3. Repository name example: `nepa-accounting-erp`.
4. Keep it Public if using GitHub Free Pages, or Private if your plan supports private Pages.
5. Upload all files from this folder.
6. Commit the files.
7. Open Settings > Pages.
8. Select Source: Deploy from a branch.
9. Select Branch: main and Folder: /root.
10. Save.
11. Wait for GitHub to publish the site.
12. Open the link shown in Pages settings.

## Option B: GitHub Actions deployment

This package includes `.github/workflows/static.yml`.

If you enable Pages through GitHub Actions, GitHub can deploy the site automatically whenever you push changes to the main branch.

## Data storage warning

This GitHub Pages version saves data in the browser. It does not save shared data inside GitHub.

For office-wide shared accounting data, use this structure:

- GitHub: source code
- GitHub Pages: frontend hosting
- Backend server: business logic
- Database: shared accounting data

Recommended database choices:

- PostgreSQL
- MySQL
- Supabase
- Firebase

