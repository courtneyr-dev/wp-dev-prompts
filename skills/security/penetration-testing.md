# WordPress Penetration Testing

> **Type**: Skill
> **Domain**: security/testing
> **Source**: [sickn33/antigravity-awesome-skills](https://skills.sh/sickn33/antigravity-awesome-skills/wordpress-penetration-testing)

<skill>
<summary>
Systematic security assessment methodology for WordPress installations, from enumeration through exploitation.
</summary>

<knowledge>
## Prerequisites

**Legal Requirements**:
- Written authorization from site owner
- Defined scope and boundaries
- Responsible disclosure agreement
- Documentation of all activities

**Tools**:
- WPScan
- Nmap
- Burp Suite
- Metasploit (for authorized testing)

## Testing Phases

### Phase 1: Discovery

Identify WordPress presence via:
- `/wp-admin/`, `/wp-login.php`, `/xmlrpc.php` paths
- Meta generator tags
- RSS feed signatures
- `/wp-json/` REST API endpoints

```bash
# Quick WordPress detection
curl -s https://example.com | grep -i "wp-content\|wordpress"
```

### Phase 2: Version Enumeration

```bash
# WPScan enumeration
wpscan --url https://example.com --enumerate vp,vt,u
```

Check for version in:
- `/readme.html`
- Meta generator tag
- RSS feed
- Script/style version parameters

### Phase 3: Theme Enumeration

```bash
# Enumerate themes
wpscan --url https://example.com --enumerate t
```

Check `/wp-content/themes/` for:
- Active theme
- Inactive themes (still exploitable)
- Theme version numbers

### Phase 4: Plugin Enumeration

```bash
# Enumerate plugins (aggressive)
wpscan --url https://example.com --enumerate p --plugins-detection aggressive
```

Plugins are the primary attack surface. Check:
- Active plugins
- Inactive but present plugins
- Known vulnerable versions

### Phase 5: User Enumeration

```bash
# Via REST API
curl -s https://example.com/wp-json/wp/v2/users

# Via author archives
for i in {1..10}; do
  curl -s "https://example.com/?author=$i" | grep -o 'author/[^/]*'
done
```

### Phase 6: Configuration Exposure

Check for exposed files:
- `/wp-config.php.bak`
- `/wp-config.php~`
- `/.wp-config.php.swp`
- `/debug.log`
- `/error_log`

```bash
# Check for debug log
curl -s https://example.com/wp-content/debug.log
```

### Phase 7: XML-RPC Assessment

```bash
# Check if XML-RPC enabled
curl -s -X POST https://example.com/xmlrpc.php \
  -H "Content-Type: text/xml" \
  -d '<?xml version="1.0"?><methodCall><methodName>system.listMethods</methodName></methodCall>'
```

XML-RPC enables:
- Brute force via `wp.getUsersBlogs`
- Multicall amplification attacks
- Pingback SSRF

### Phase 8: Credential Testing

**Only with authorization**:

```bash
# WPScan password attack
wpscan --url https://example.com -U admin -P wordlist.txt
```

Use target-specific wordlists:
```bash
cewl https://example.com -d 2 -m 5 > custom_wordlist.txt
```

### Phase 9: Vulnerability Assessment

Cross-reference discovered components with:
- WPScan Vulnerability Database
- CVE databases
- Exploit-DB

Focus on:
- Unauthenticated vulnerabilities (highest risk)
- Authenticated vulnerabilities (if creds obtained)
- Privilege escalation paths

### Phase 10: Post-Authentication Testing

**Only with valid credentials and authorization**:

- Theme/plugin editor for code execution
- Media upload bypass
- Capability escalation
- Stored XSS in content

## Reporting

Document all findings with:
1. Vulnerability description
2. Severity rating (CVSS)
3. Proof of concept
4. Remediation steps
5. References

## Operational Constraints

- Respect rate limits
- Monitor for WAF blocks
- Document all requests
- Stop immediately if scope is exceeded
</knowledge>

<best_practices>
- Always get written authorization before testing
- Document everything for the report
- Test in a controlled environment first
- Respect scope boundaries strictly
- Follow responsible disclosure
</best_practices>

<references>
- [skills.sh/sickn33](https://skills.sh/sickn33/antigravity-awesome-skills/wordpress-penetration-testing)
- [WPScan Documentation](https://wpscan.com/docs)
- [OWASP Testing Guide](https://owasp.org/www-project-web-security-testing-guide/)
</references>
</skill>
