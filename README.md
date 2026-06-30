# NEPA Accounting ERP - GitHub Pages Edition

This is a browser-based Accounting ERP starter that can be hosted directly from GitHub Pages.

## Important storage note

GitHub Pages hosts static files only: HTML, CSS and JavaScript. This version stores data in the browser localStorage.

That means:

- No Excel is required.
- No server installation is required.
- It can run from a GitHub Pages link.
- Data is saved in the same browser/device.
- Use Export Backup and Import Backup to move data between devices.
- For true multi-user shared company data, connect this frontend to a backend API and database such as PostgreSQL, Supabase, Firebase, MySQL, or another cloud database.

## Default login

Username: admin
Password: admin123

This client-side login is only for starter/demo use. Do not treat it as production security.

## Main modules included

- Dashboard
- Companies
- Branches
- Contacts
- Products
- Chart of Accounts
- Sales Invoices
- Vendor Bills
- Inventory Movements
- Manual Journal Entries
- Trial Balance
- Receivables Outstanding
- Payables Outstanding
- Inventory Valuation
- Audit Log
- JSON Backup and Restore

## How to host on GitHub Pages

1. Create a new GitHub repository, for example: `nepa-accounting-erp`.
2. Upload all files from this folder to the repository root:
   - `index.html`
   - `assets/style.css`
   - `assets/app.js`
   - `README.md`
3. Commit the files.
4. Go to repository Settings.
5. Open Pages.
6. Under Build and deployment, choose:
   - Source: Deploy from a branch
   - Branch: main
   - Folder: /root
7. Save.
8. Open the GitHub Pages URL shown by GitHub.

The URL usually looks like:

`https://YOUR-USERNAME.github.io/nepa-accounting-erp/`

## How data is stored

The app stores ERP data inside browser localStorage using this key:

`nepa_accounting_erp_github_pages_v1`

Use Export Backup regularly. The exported JSON backup contains your accounting and inventory data.

## Recommended production upgrade

For a real company-wide ERP, use this GitHub Pages app only as frontend and add:

- Backend API: Node.js, Django, Laravel, or FastAPI
- Database: PostgreSQL or MySQL
- Authentication: secure server-side login with role permissions
- Backup: automated database backup
- Hosting: Render, Railway, DigitalOcean, AWS, Azure, or company server

## Suggested production architecture

GitHub Repository -> GitHub Pages frontend -> Backend API -> PostgreSQL database

