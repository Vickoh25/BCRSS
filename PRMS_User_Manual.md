# Patient Referral Management System (PRMS)

## User Manual

---

**Version:** 1.0
**Date:** September 2026

---

## Table of Contents

1. Introduction
2. Getting Started
3. Dashboard
4. Managing Patients
5. Managing Referrals
6. Managing Hospitals
7. Managing Staff
8. Notifications
9. Reports & Audit Logs
10. Troubleshooting & FAQ

---

## 1. Introduction

The **Patient Referral Management System (PRMS)** is a platform used to coordinate patient referrals between healthcare facilities. It enables staff to register patients, create and track referrals, communicate in real time, and manage facility operations.

### User Roles

| Role | Access Level |
|------|-------------|
| **System Administrator** | Platform-wide management, system reports, audit logs |
| **Hospital Administrator** | Facility staff, referral performance, facility reports |
| **Clinician** | Patient registration, referrals, chat, attachments |
| **Receptionist** | Patient registration, referral dispatch/receive |

---

*[Screenshot: PRMS Home Screen]*

---

## 2. Getting Started

### 2.1 Signing In

1. Open the PRMS login page
2. Enter your **Username** or **Email**
3. Enter your **Password**
4. Select **Sign In**

*[Screenshot: Login Screen — Fig. 2.1]*

> **Note:** If two-factor authentication is enabled, you will be prompted for a verification code after signing in.

---

### 2.2 Two-Factor Verification

For accounts with 2FA enabled:

1. Open your authenticator app or check SMS for a 6-digit code
2. Enter the code in the **Verification Code** field
3. Select **Verify Code**

*[Screenshot: Two-Factor Verification Screen — Fig. 2.2]*

---

### 2.3 Forgot Password

If you cannot remember your password:

1. Select **Forgot Password?** from the login screen
2. Enter your registered email address and submit
3. Check your email for a password reset link

*[Screenshot: Forgot Password Screen — Fig. 2.3]*

---

### 2.4 Resetting Your Password

Follow the link from the password-reset email. Your new password must meet these requirements:

- At least 12 characters
- One uppercase letter
- One lowercase letter
- One number
- One special character (@ $ ! % * ? &)

*[Screenshot: Reset Password Screen — Fig. 2.4]*

---

### 2.5 Roles & Permissions Overview

| Area | System Admin | Hospital Admin | Clinician | Receptionist |
|------|:------------:|:--------------:|:---------:|:------------:|
| Dashboard | ✓ | ✓ | ✓ | ✓ |
| Patients | — | ✓ | ✓ | ✓ |
| Referrals | — | ✓ | ✓ | ✓ |
| Referral Chat | — | — | ✓ | ✓ |
| Notifications | ✓ | ✓ | ✓ | ✓ |
| Hospitals | ✓ | — | — | — |
| Staff (Users) | — | ✓ | — | — |
| Reports | ✓ | ✓ | — | — |
| Audit Logs | ✓ | — | — | — |

> **Note:** Referral attachments (lab results, imaging, referral letters) are visible only to Clinicians and can only be uploaded or removed by the creating facility's Clinician.

---

## 3. Dashboard

The dashboard is the first screen after signing in. Content varies by role.

### 3.1 System Admin Dashboard

Provides a platform-wide overview:

- Pending Approvals
- Active Hospitals
- Security Alerts
- Total Referrals (last 30 days)
- Pending hospital applications

*[Screenshot: System Admin Dashboard — Fig. 3.1]*

---

### 3.2 Hospital Admin Dashboard

Shows facility-level summary for the last 30 days:

- Active Staff
- Total Referrals
- Accepted Referrals
- Average Response Time

*[Screenshot: Hospital Admin Dashboard — Fig. 3.2]*

---

### 3.3 Clinician / Receptionist Dashboard

A personal view of daily referral activity:

- **Incoming Pending** — referrals awaiting action
- **Outgoing Drafts** — referrals started but not dispatched
- **Urgent Cases** — highlighted urgent and emergent referrals

*[Screenshot: Clinician/Receptionist Dashboard — Fig. 3.3]*

---

## 4. Managing Patients

**Role Access:** Clinicians and Receptionists

### 4.1 Viewing the Patient List

Select **Patients** from the main navigation to see all patients at your facility. Use the search and filters at the top to find a specific patient.

*[Screenshot: Patient List — Fig. 4.1]*

---

### 4.2 Registering a New Patient

1. Select **Register Patient** from the Patient List
2. Complete the required fields
3. Select **Register Patient** to save

*[Screenshot: Register New Patient Form — Fig. 4.2]*

**Required Fields:**

| Field | Required | Notes |
|-------|:--------:|-------|
| Full Name | ✓ | Patient's full legal name |
| Gender | ✓ | Male, Female, Other, or Prefer not to say |
| Date of Birth | ✓ | — |
| County | ✓ | Filters the Sub-County list |

**Optional Fields:** National ID, Phone Number, Sub-County, Next of Kin Name, Next of Kin Phone

> **Important:** National ID cannot be changed once the patient is registered.

---

### 4.3 Viewing & Editing a Patient

Select any patient from the list to open their detail page with demographic information and referral history.

*[Screenshot: Patient Detail Page — Fig. 4.3]*

> **Tip:** You can start a new referral directly from a patient's detail page — this pre-fills the patient information.

---

## 5. Managing Referrals

**Role Access:** Clinicians, Receptionists, and Hospital Admins. Chat is available to Clinicians only.

### 5.1 Viewing the Referral List

Select **Referrals** from the main navigation. Filter by status, urgency, or whether your facility is the source or destination.

*[Screenshot: Referral List — Fig. 5.1]*

---

### 5.2 Referral Status Workflow

Every referral moves through these statuses:

| Status | Meaning |
|--------|---------|
| **Draft** | Created but not yet sent |
| **Dispatched** | Sent to destination facility |
| **Received** | Destination facility acknowledged receipt |
| **Accepted** | Destination facility agreed to take the patient |
| **Rejected** | Referral declined (reason recorded) |
| **Completed** | Referral fully actioned |

*[Screenshot: Referral Status Workflow Diagram — Fig. 5.2]*

**Status Transitions by Role:**

| Role | Available Actions |
|------|------------------|
| System Admin / Hospital Admin / Clinician | Dispatch, Receive, Accept, Reject, Complete, Return to Draft |
| Receptionist | Dispatch, Receive |

---

### 5.3 Creating a New Referral

1. Select **New Referral** from the Referral List (or start from a patient's detail page)
2. Complete the required fields
3. Select **Create Referral**

*[Screenshot: New Referral Form — Fig. 5.3]*

**Required Fields:**

| Field | Required | Notes |
|-------|:--------:|-------|
| Patient | ✓ | Search and select an existing patient |
| Destination Hospital | ✓ | Search from approved facilities |
| Urgency Level | ✓ | Routine, Urgent, or Emergent |
| Reason for Referral | ✓ | — |

**Optional Fields:** Billing Type (SHA, MADISON, CASH, Other), Clinical Summary, Attachments

> **Attachments (Clinicians only):** Accepted formats: JPG, PNG, WEBP, HEIC, PDF, DOC, DOCX. Maximum 15 MB per file.

---

### 5.4 Referral Detail Page

Select any referral to view full details, status timeline, and available actions.

*[Screenshot: Referral Detail Page — Fig. 5.4]*

**Available Actions:**

- **Download PDF** — exports the referral as a PDF document
- **Status Action Buttons** — move the referral to its next valid status
- **Open Chat** — Clinicians only; opens the messaging thread
- **Delete Draft** — available only while in Draft status

> **Note:** Rejected referrals display the rejection reason at the top of the page.

---

### 5.5 Referral Chat

Clinicians can message their counterpart at the other facility about a specific referral in real time using the **Open Chat** action on the referral detail page.

*[Screenshot: Referral Chat — Fig. 5.5]*

---

## 6. Managing Hospitals

**Role Access:** System Administrators only

### 6.1 Viewing the Hospital List

Select **Hospitals** from the main navigation to see all registered facilities and their approval status.

*[Screenshot: Hospital List — Fig. 6.1]*

| Status | Meaning |
|--------|---------|
| **Pending** | Application submitted; awaiting review |
| **Approved** | Facility is active and can send/receive referrals |
| **Suspended** | Facility access temporarily disabled |
| **Rejected** | Application was declined |

---

### 6.2 Registering a New Hospital

1. Select **Register Hospital** from the Hospital List
2. Complete the required fields
3. Submit the form

*[Screenshot: Register New Hospital Form — Fig. 6.2]*

**Required Fields:** Hospital Name, MoH Code (letters, digits, hyphens), Facility Level (Level 2–6), County, Sub-County

**Optional Fields:** Address, Phone Number, Email

---

### 6.3 Approving Hospital Applications

Select a pending hospital from the list to view its details and approve or reject the application.

*[Screenshot: Hospital Detail & Approval — Fig. 6.3]*

> **Note:** A newly approved hospital has no staff. Use **Add Staff Member** (Chapter 7) to create its first Hospital Admin account.

---

## 7. Managing Staff

**Role Access:** Hospital Admins for their own facility. System Admins can also create the first Hospital Admin account.

### 7.1 Viewing the Staff List

Select **Users (Staff)** from the main navigation to see everyone with an account at your facility.

*[Screenshot: Staff List — Fig. 7.1]*

---

### 7.2 Adding a Staff Member

1. Select **Add Staff Member** from the Staff List
2. Complete the form
3. Submit

*[Screenshot: Add Staff Member Form — Fig. 7.2]*

**Required Fields:**

| Field | Required | Notes |
|-------|:--------:|-------|
| Role | ✓ | Hospital Admin, Clinician, or Receptionist |
| Full Name | ✓ | — |
| Username | ✓ | At least 4 characters; letters, numbers, underscores |

**Optional Fields:** Email (for credential delivery), Phone Number (format: +254XXXXXXXXX), Hospital (System Admin only)

---

### 7.3 Handing Off Login Credentials

When a staff account is created, PRMS generates a temporary password displayed once in a Credentials dialog.

*[Screenshot: Credentials Handoff Dialog — Fig. 7.3]*

> **Important:** The temporary password is shown only once and is not stored anywhere retrievable. Record or share it before closing the dialog. If an email is provided, PRMS will also attempt to send credentials by email (best-effort delivery).

---

### 7.4 Editing Staff & Changing Status

Select a staff member from the list to edit their details or change their account status (e.g., deactivate when someone leaves).

*[Screenshot: Staff Edit Page — Fig. 7.4]*

---

## 8. Notifications

The notification bell in the top navigation bar alerts you to referral activity relevant to your role:

- New referrals dispatched to your facility
- Status changes on your referrals
- System announcements

Select **Notifications** to see the full list.

*[Screenshot: Notifications Panel — Fig. 8.1]*

---

## 9. Reports & Audit Logs

**Role Access:** System Administrators and Hospital Administrators for Reports. System Administrators only for Audit Logs.

All reports use anonymized referral data — no patient-identifying information is included.

### 9.1 Reports

Select **Reports** from the main navigation. Reports are organized into three tabs, each downloadable as a PDF:

- **Trends** — Referral volume and outcomes over time
- **County Breakdown** — Referral activity grouped by county
- **Facility Performance** — Response times and outcomes across facilities

*[Screenshot: Reports Page — Fig. 9.1]*

---

### 9.2 Audit Logs

Select **Audit Logs** from the main navigation to review security- and account-relevant actions across the platform (logins, staff account changes, hospital approvals).

*[Screenshot: Audit Log Page — Fig. 10.1]*

---

## 10. Troubleshooting & FAQ

### I can't sign in.

Double-check your username/email and password. Use **Forgot Password** on the login screen (section 2.3) if needed. If your account has been deactivated, contact your Hospital Admin or System Admin.

### I didn't receive my two-factor code.

Check your authenticator app is showing the current code, or check your SMS messages. If the problem continues, contact your administrator.

### I don't see a menu item I need (e.g., Reports, Hospitals, Users).

Access is controlled by your role. Review the Roles & Permissions table in section 2.5, and contact your administrator if you believe your access is incorrect.

### I can't upload an attachment to a referral.

Attachments can only be added by a Clinician at the facility that created the referral. Each file must be under 15 MB and in an accepted format (JPG, PNG, WEBP, HEIC, PDF, DOC, DOCX).

### A referral status action I expect isn't available.

Available actions depend on both the referral's current status and your role. See the workflow table in section 5.2.

---

*End of Manual*
