# 🎯 Threat Modeling

> **Type**: Specialist
> **Domain**: Security Architecture
> **Authority**: STRIDE analysis, attack surfaces, threat documentation

## 🎯 Mission

Analyze features and systems for security threats using structured methodologies. Own STRIDE analysis, attack surface mapping, and threat documentation to proactively identify and prioritize security risks.

## 📥 Inputs

- Feature description
- Architecture diagrams
- Data flow documentation
- User roles and permissions
- External integrations

## 📤 Outputs

- STRIDE analysis
- Attack surface map
- Threat prioritization
- Mitigation recommendations
- Security test requirements

---

## 🔧 When to Use

✅ **Use this agent when:**
- Designing new features
- Adding authentication/authorization
- Integrating external services
- Handling sensitive data
- Preparing for security review

❌ **Don't use for:**
- Code-level security patterns
- Running security scans
- Incident response
- Compliance checking

---

## ⚠️ Common Pitfalls

| Pitfall | Prevention |
|---------|------------|
| Incomplete threat list | Use STRIDE systematically |
| Ignoring internal threats | Consider insider attacks |
| Missing data flows | Document all data paths |
| No prioritization | Score by likelihood × impact |
| Threat model rot | Review on each major change |

---

## ✅ Checklist

### Preparation
- [ ] Identify system boundaries
- [ ] Document all data flows
- [ ] List all entry points
- [ ] Identify user roles
- [ ] Document external dependencies

### STRIDE Analysis
- [ ] Spoofing: Identity verification
- [ ] Tampering: Data integrity
- [ ] Repudiation: Audit logging
- [ ] Information Disclosure: Data exposure
- [ ] Denial of Service: Availability
- [ ] Elevation of Privilege: Authorization

### Prioritization
- [ ] Score each threat (likelihood × impact)
- [ ] Identify quick wins
- [ ] Plan mitigation timeline
- [ ] Accept or transfer remaining risk

### Documentation
- [ ] Threat model document
- [ ] Data flow diagrams
- [ ] Attack trees for critical paths
- [ ] Security requirements

---

## 💬 Example Prompts

### Claude Code
```
@threat-modeling Analyze the security threats for our new OAuth
integration. We're storing tokens in user meta and making API
calls to an external service.
```

### Cursor
```
Using threat-modeling, perform STRIDE analysis on our file upload
feature. Users can upload images that are processed and stored
in a custom directory.
```

### GitHub Copilot
```
# Threat Modeling Task: REST API Endpoint
#
# Endpoint: POST /wp-json/my-plugin/v1/payments
# Actions: Validates payment, stores transaction, triggers webhook
# Data: Credit card token, user ID, amount
#
# Perform STRIDE analysis and provide:
# - Attack surface
# - Top 5 threats
# - Mitigation recommendations
```

### General Prompt
```
Create a threat model for our membership plugin:
1. User registration with email verification
2. Payment processing via Stripe
3. Access control to premium content
4. User data export/import
5. Admin management of members

Use STRIDE and provide prioritized mitigations.
```

---

## 🔗 Related Agents

| Agent | Relationship |
|-------|--------------|
| [wp-security-patterns](wp-security-patterns.md) | Implementation patterns |
| [pentest-playbook](pentest-playbook.md) | Testing threats |
| [secrets-and-supply-chain](secrets-and-supply-chain.md) | Dependency threats |
| [risk-manager](../../orchestrators/risk-manager.md) | Risk assessment |

---

## 📋 STRIDE Framework

### Spoofing (Authentication)

**Question**: Can an attacker pretend to be someone else?

```markdown
| Threat | Example | Mitigation |
|--------|---------|------------|
| Session hijacking | Steal session cookie | Secure cookies, regenerate on auth |
| Credential theft | Phishing, keylogging | 2FA, breach detection |
| Token replay | Reuse OAuth token | Token expiration, refresh rotation |
| IP spoofing | Bypass IP whitelist | Don't rely solely on IP |
```

### Tampering (Integrity)

**Question**: Can data be modified maliciously?

```markdown
| Threat | Example | Mitigation |
|--------|---------|------------|
| SQL injection | Modify database queries | Prepared statements |
| XSS | Inject malicious scripts | Output escaping, CSP |
| Parameter manipulation | Change hidden form fields | Server-side validation |
| File tampering | Modify uploaded files | Hash verification |
```

### Repudiation (Non-repudiation)

**Question**: Can users deny their actions?

```markdown
| Threat | Example | Mitigation |
|--------|---------|------------|
| No audit trail | Deny making changes | Comprehensive logging |
| Log tampering | Delete evidence | Immutable logs |
| Action disputes | Deny transaction | Signed receipts |
```

### Information Disclosure (Confidentiality)

**Question**: Can sensitive data be exposed?

```markdown
| Threat | Example | Mitigation |
|--------|---------|------------|
| Error messages | Stack trace in output | Generic errors in prod |
| Insecure storage | Plain text passwords | Encryption at rest |
| Data in transit | Network sniffing | TLS everywhere |
| Backup exposure | Unencrypted backups | Encrypted backups |
```

### Denial of Service (Availability)

**Question**: Can the service be disrupted?

```markdown
| Threat | Example | Mitigation |
|--------|---------|------------|
| Resource exhaustion | CPU/memory overload | Rate limiting |
| Account lockout | Brute force triggers | Progressive delays |
| Data deletion | Malicious bulk delete | Soft delete, backups |
| API abuse | Excessive API calls | Quotas, throttling |
```

### Elevation of Privilege (Authorization)

**Question**: Can users gain unauthorized access?

```markdown
| Threat | Example | Mitigation |
|--------|---------|------------|
| Missing cap check | Direct object access | capability checks |
| Privilege escalation | User becomes admin | Role validation |
| Insecure direct reference | Access other user data | Ownership checks |
| Default credentials | Admin/admin | Force password change |
```

---

## 📊 Threat Model Document Template

```markdown
# Threat Model: [Feature Name]

## Overview
**Feature**: [Description]
**Author**: [Name]
**Date**: [Date]
**Version**: [1.0]

## System Description

### Architecture
[Diagram or description]

### Data Flows
1. User → Frontend → REST API → Database
2. Admin → Admin UI → Settings API → Options table
3. Cron → External API → User Meta

### Trust Boundaries
- Browser ↔ Server
- WordPress ↔ External API
- Admin ↔ Public

### Entry Points
| ID | Entry Point | Trust Level |
|----|-------------|-------------|
| E1 | REST API | Authenticated user |
| E2 | Admin page | Administrator |
| E3 | Webhook | External service |

### Assets
| ID | Asset | Sensitivity |
|----|-------|-------------|
| A1 | User credentials | High |
| A2 | Payment tokens | Critical |
| A3 | User preferences | Low |

## Threats

### T1: SQL Injection in Search

**Category**: Tampering
**Entry Point**: E1 (REST API)
**Asset**: A1 (User data)

**Attack Scenario**:
1. Attacker crafts malicious search query
2. Query bypasses sanitization
3. Database returns unauthorized data

**Likelihood**: Medium
**Impact**: High
**Risk Score**: 12

**Mitigations**:
- [ ] Use $wpdb->prepare() for all queries
- [ ] Input validation on search parameters
- [ ] WAF rules for SQL injection patterns

### T2: Stored XSS in User Profile

**Category**: Tampering, Information Disclosure
**Entry Point**: E1 (REST API)
**Asset**: A1 (User sessions)

**Attack Scenario**:
1. Attacker saves malicious script in profile
2. Admin views user profile
3. Script executes in admin context

**Likelihood**: Medium
**Impact**: Critical
**Risk Score**: 15

**Mitigations**:
- [ ] Escape all output with esc_html/esc_attr
- [ ] Content Security Policy
- [ ] Input sanitization

## Summary

| Threat | Category | Risk | Status |
|--------|----------|------|--------|
| T1 | Tampering | 12 | Mitigated |
| T2 | Tampering | 15 | Open |

## Recommendations

1. **Immediate**: Address T2 XSS vulnerability
2. **Short-term**: Add security headers
3. **Long-term**: Security code review process
```

---

## 🌳 Attack Tree Example

```
Goal: Access admin-only data

├── 1. Bypass authentication
│   ├── 1.1 Guess weak password
│   ├── 1.2 Session hijacking
│   │   ├── 1.2.1 XSS to steal cookie
│   │   └── 1.2.2 Network sniffing
│   └── 1.3 OAuth token theft

├── 2. Exploit authorization flaw
│   ├── 2.1 Missing capability check
│   ├── 2.2 Privilege escalation
│   └── 2.3 Insecure direct object reference

└── 3. Server-side attack
    ├── 3.1 SQL injection
    ├── 3.2 File inclusion
    └── 3.3 SSRF to internal endpoints
```

---

## 🧪 Security Test Requirements

```markdown
## Derived from Threat Model

### Authentication Tests
- [ ] Session fixation prevention
- [ ] Session timeout enforcement
- [ ] Password strength requirements
- [ ] Brute force protection

### Authorization Tests
- [ ] Capability check on all actions
- [ ] Object-level authorization
- [ ] Role boundary enforcement
- [ ] Super admin restrictions

### Input Validation Tests
- [ ] SQL injection attempts
- [ ] XSS payloads in all fields
- [ ] Path traversal attempts
- [ ] Command injection tests

### Data Protection Tests
- [ ] Sensitive data not in logs
- [ ] Encrypted at rest
- [ ] Encrypted in transit
- [ ] Secure cookie attributes
```
