# Feature Hypothesis for WordPress

> **Type**: Skill
> **Domain**: product-management
> **Source**: [deanpeters/product-manager-prompts](https://github.com/deanpeters/product-manager-prompts) — Adapted for WordPress

<skill>
<summary>
Create testable hypotheses for WordPress plugin features using lean product methodology.
</summary>

<knowledge>
## Hypothesis Format

```markdown
## Feature Hypothesis: [Feature Name]

### Hypothesis Statement
**If** we [build/change/add this]
**for** [specific WordPress persona]
**then** we will [see this outcome]
**because** [underlying assumption about user behavior]

### Key Assumptions
1. [Assumption that must be true for hypothesis to work]
2. [Another critical assumption]
3. [Third assumption]

### Validation Experiments
| Experiment | Metric | Success Threshold | Timeline |
|------------|--------|-------------------|----------|
| [Test 1] | [What we measure] | [Target] | [Duration] |
| [Test 2] | [What we measure] | [Target] | [Duration] |

### Minimum Success Criteria
- Quantitative: [Specific numbers]
- Qualitative: [User feedback patterns]
- Timeline: [When we'll evaluate]
```

## WordPress Experiment Types

### Pre-Build Experiments (Validate Demand)

**Fake Door Test**
Add a menu item or button for the feature. Measure clicks.
```
If 5%+ of users click "Try New Feature X"
within 30 days, proceed with development.
```

**Landing Page Test**
Create a page describing the feature. Measure email signups.
```
If 100+ users sign up for early access
within 2 weeks, validate demand exists.
```

**Support Request Analysis**
Count how often users ask for this functionality.
```
If 20+ support tickets/month request this feature
the problem is validated as frequent.
```

**Competitor Review Mining**
Analyze competitor plugin reviews for this use case.
```
If competitors have 10+ reviews mentioning this pain
the market need is validated.
```

### Build Experiments (Validate Solution)

**Beta Release**
Ship to subset of users, measure adoption.
```
If 30%+ of beta users activate the feature
within 7 days, the solution resonates.
```

**A/B Test**
Compare versions with and without the feature.
```
If version with feature improves [metric] by 10%+
the feature provides measurable value.
```

**Usability Test**
Watch 5 users attempt to use the feature.
```
If 4/5 users complete the task without help
the UX is sufficient for launch.
```

### Post-Launch Experiments (Validate Value)

**Feature Usage Analytics**
Track actual usage patterns.
```
If 20%+ of active users engage with feature weekly
it's providing ongoing value.
```

**Cohort Retention**
Compare retention of users who use feature vs. don't.
```
If feature users have 15%+ better retention
the feature drives sticky behavior.
```

## WordPress-Specific Metrics

### Activation Metrics
- Plugin activated → settings configured
- Settings configured → first use of primary feature
- First use → repeat use within 7 days

### Engagement Metrics
- Feature usage frequency
- Time spent in feature
- Feature completion rate
- Error/abandon rate

### Value Metrics
- Support ticket reduction
- Upgrade conversion (free → paid)
- Referral/review generation
- Churn reduction

### WordPress.org Metrics
- Active installation growth
- Rating improvement
- Support ticket volume change
- Review sentiment

## Example Hypotheses

### Block Editor Feature
```markdown
### Hypothesis Statement
**If** we add a one-click "Design Variants" button to our block
**for** Content Editors using Gutenberg
**then** we will see 40% increase in block usage
**because** users currently struggle to customize block appearance

### Key Assumptions
1. Users want design flexibility but not complexity
2. Pre-made variants will match common use cases
3. Users will discover the feature in the toolbar

### Validation Experiments
| Experiment | Metric | Success | Timeline |
|------------|--------|---------|----------|
| Beta release | Variant button clicks | 25% of block users | 2 weeks |
| User testing | Task completion | 4/5 users succeed | 1 week |
| A/B test | Block usage rate | +40% usage | 4 weeks |
```

### Performance Feature
```markdown
### Hypothesis Statement
**If** we add automatic image optimization on upload
**for** Site Administrators concerned about performance
**then** we will reduce average page load time by 30%
**because** unoptimized images are the #1 cause of slow WordPress sites

### Key Assumptions
1. Users don't currently optimize images
2. Automatic optimization won't noticeably affect upload flow
3. Quality after optimization will be acceptable

### Validation Experiments
| Experiment | Metric | Success | Timeline |
|------------|--------|---------|----------|
| Survey existing users | % not optimizing | >60% don't | 1 week |
| Beta with 100 users | Page speed improvement | >25% faster | 4 weeks |
| Quality test | User complaints about quality | <5% | 4 weeks |
```

## Decision Framework

After experiments:

| Result | Action |
|--------|--------|
| Exceeds threshold | Ship and scale |
| Meets threshold | Ship, continue monitoring |
| Near threshold | Iterate and retest |
| Below threshold | Pivot or kill |

## Kill Criteria

Define upfront when you'll abandon the feature:
- If [metric] doesn't reach [threshold] after [time]
- If user feedback is consistently negative on [aspect]
- If development cost exceeds [budget/time]
</knowledge>

<best_practices>
- Write hypothesis before building anything
- Define success metrics upfront
- Run cheapest experiment first
- Set kill criteria before you're emotionally invested
- Document learnings whether hypothesis succeeds or fails
</best_practices>

<references>
- [deanpeters/product-manager-prompts](https://github.com/deanpeters/product-manager-prompts)
- [Tim Herbig - Lean UX Hypothesis](https://www.timherbig.de/lean-ux-hypothesis/)
- [Lean Startup Methodology](https://theleanstartup.com/)
</references>
</skill>
