import os

OUT = "."
os.makedirs(OUT, exist_ok=True)

# ── shared nav / footer fragments ─────────────────────────────────────────────
NAV = """<nav class="site-nav">
  <a href="../math-lessons.html" class="nav-logo">Ronny Best <span>∑</span></a>
  <ul class="nav-links">
    <li><a href="../index.html">Home</a></li>
    <li><a href="../math-lessons.html" class="active">Lessons</a></li>
    <li><a href="../tasks.html">Practice</a></li>
    <li><a href="../achievements.html">Achievements</a></li>
    <li><a href="../contact.html" class="nav-cta">Contact</a></li>
  </ul>
</nav>"""

FOOTER = """<footer>
  <p>
    <a href="../index.html">Home</a> &middot;
    <a href="../math-lessons.html">Math Lessons</a> &middot;
    <a href="../tasks.html">Practice</a> &middot;
    <a href="../about.html">About</a> &middot;
    <a href="../privacy.html">Privacy Policy</a> &middot;
    <a href="../terms.html">Terms</a>
  </p>
  <p>&copy; 2025 Ronny Best Mathematics &mdash; Free Maths Education for Everyone</p>
</footer>"""

ADSENSE_SCRIPT = '<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossorigin="anonymous"></script>'

AD_SLOT = lambda slot: f"""<div class="ad-slot">
  <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
       data-ad-slot="{slot}" data-ad-format="auto" data-full-width-responsive="true"></ins>
  <script>(adsbygoogle = window.adsbygoogle || []).push({{}});</script>
</div>"""

TOPIC_JS = """<script src="../shared.js"></script>
<script>
document.addEventListener('DOMContentLoaded', () => {
  // Track topic view
  if (typeof MathProgress !== 'undefined') {
    const title = document.querySelector('.topic-hero h1');
    if (title) MathProgress.recordTopicViewed(title.textContent.trim());
  }
  // TOC active state on scroll
  const sections = document.querySelectorAll('.topic-section');
  const tocLinks  = document.querySelectorAll('.toc-list a[href^="#"]');
  const observer  = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        tocLinks.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.toc-list a[href="#${e.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { rootMargin: '-20% 0px -70% 0px' });
  sections.forEach(s => observer.observe(s));
});
</script>"""

def head(title, desc, topic_id):
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title} | Ronny Best Mathematics</title>
  <meta name="description" content="{desc}">
  {ADSENSE_SCRIPT}
  <link rel="stylesheet" href="topic.css">
  <link rel="icon" type="image/png" href="../IMAGES/og-image.png">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
{NAV}"""

def wrap(hero_icon, topic_title, hero_sub, levels, breadcrumb_label, toc_html, content_html, prev_link, prev_label, next_link, next_label, topic_id):
    level_pills = " ".join([
        f'<span class="level-pill pill-{l[0]}">{l[1]}</span>' for l in levels
    ])
    return f"""
<section class="topic-hero">
  <span class="hero-icon">{hero_icon}</span>
  <h1>{topic_title}</h1>
  <p class="hero-sub">{hero_sub}</p>
  <div class="level-pills">{level_pills}</div>
</section>

<div class="breadcrumb">
  <a href="../math-lessons.html">Math Lessons</a> &rsaquo; <strong>{breadcrumb_label}</strong>
</div>

{AD_SLOT("9901000001")}

<div class="topic-wrap">
  <!-- TOC Sidebar -->
  <aside class="toc-sidebar">
    <h3>Contents</h3>
    <ul class="toc-list">
{toc_html}
    </ul>
  </aside>

  <!-- Main content -->
  <main class="topic-content">
{content_html}

    {AD_SLOT("9901000003")}

    <!-- Prev / Next navigation -->
    <div class="topic-nav">
      <a href="{prev_link}" class="topic-nav-btn prev">← {prev_label}</a>
      <a href="{next_link}" class="topic-nav-btn next">{next_label} →</a>
    </div>
  </main>
</div>

{FOOTER}
{TOPIC_JS}
</body>
</html>"""

# ─────────────────────────────────────────────────────────────────────────────
# TOPIC DATA — (filename, title, icon, sub, levels, toc_items, sections)
# Each section: (id, header, badge_class, badge_text, body_html)
# ─────────────────────────────────────────────────────────────────────────────

topics = []

# ══════════════════════ 1. TRIGONOMETRY ══════════════════════
trig_toc = """
      <li class="toc-level">Beginner</li>
      <li><a href="#basic-ratios">Basic Ratios</a></li>
      <li><a href="#unit-circle">Unit Circle</a></li>
      <li class="toc-level">Secondary</li>
      <li><a href="#identities">Identities</a></li>
      <li><a href="#sine-cosine-rules">Sine & Cosine Rules</a></li>
      <li><a href="#compound-angles">Compound Angles</a></li>
      <li><a href="#graphs">Trig Graphs</a></li>
      <li class="toc-level">University</li>
      <li><a href="#inverse-trig">Inverse Functions</a></li>
      <li><a href="#complex-trig">Complex & Hyperbolic</a></li>
      <li><a href="#fourier">Fourier Series</a></li>"""

trig_content = f"""
    <section id="basic-ratios" class="topic-section">
      <div class="section-header">
        <span class="sec-icon">📐</span>
        <h2>Basic Trigonometric Ratios</h2>
        <span class="level-badge badge-primary">Primary / Beginner</span>
      </div>
      <div class="section-body">
        <div class="sub">
          <h3>What is Trigonometry?</h3>
          <p>Trigonometry studies relationships between angles and side lengths in triangles. The word comes from Greek: <em>trigonon</em> (triangle) + <em>metron</em> (measure).</p>
          <div class="callout tip"><span class="callout-icon">💡</span><span><strong>Real-world uses:</strong> architects measuring roof angles, pilots navigating, GPS systems calculating distances, engineers designing bridges.</span></div>
        </div>
        <div class="sub">
          <h3>The Right-Angled Triangle</h3>
          <p>In a right-angled triangle with an acute angle θ:</p>
          <ul>
            <li><strong>Hypotenuse (H):</strong> longest side, always opposite the right angle</li>
            <li><strong>Opposite (O):</strong> side directly across from angle θ</li>
            <li><strong>Adjacent (A):</strong> side next to angle θ (not the hypotenuse)</li>
          </ul>
          <div class="callout note"><span class="callout-icon">📝</span><span>Memory trick: <strong>SOH CAH TOA</strong></span></div>
          <div class="formula-box">
            sin θ = Opposite / Hypotenuse &nbsp;&nbsp; (SOH)<br>
            cos θ = Adjacent / Hypotenuse &nbsp;&nbsp; (CAH)<br>
            tan θ = Opposite / Adjacent &nbsp;&nbsp;&nbsp;&nbsp; (TOA)
          </div>
          <h4>Reciprocal Ratios</h4>
          <div class="formula-box">
            cosec θ = 1/sin θ &nbsp;&nbsp; sec θ = 1/cos θ &nbsp;&nbsp; cot θ = 1/tan θ
          </div>
        </div>
        <div class="sub">
          <h4>Worked Examples</h4>
          <div class="example-grid">
            <div class="example-card">
              <div class="example-label">Example 1 — Finding sin</div>
              <p>A right triangle has opposite = 3, hypotenuse = 5. Find sin θ.</p>
              <p class="soln">sin θ = 3/5 = 0.6 &nbsp;→&nbsp; θ = arcsin(0.6) ≈ 36.87°</p>
            </div>
            <div class="example-card">
              <div class="example-label">Example 2 — Finding a side</div>
              <p>In a right triangle, hypotenuse = 10 cm, θ = 30°. Find the opposite side.</p>
              <p class="soln">Opposite = H × sin 30° = 10 × 0.5 = 5 cm</p>
            </div>
            <div class="example-card">
              <div class="example-label">Example 3 — Application</div>
              <p>A ladder 6 m long leans against a wall at 60° to the ground. How high does it reach?</p>
              <p class="soln">Height = 6 × sin 60° = 6 × (√3/2) = 3√3 ≈ 5.20 m</p>
            </div>
          </div>
        </div>
        <div class="sub">
          <h3>Special Angles</h3>
          <table class="formula-table">
            <tr><th>Angle</th><th>sin</th><th>cos</th><th>tan</th></tr>
            <tr><td>0°</td><td>0</td><td>1</td><td>0</td></tr>
            <tr><td>30°</td><td>1/2</td><td>√3/2</td><td>1/√3</td></tr>
            <tr><td>45°</td><td>√2/2</td><td>√2/2</td><td>1</td></tr>
            <tr><td>60°</td><td>√3/2</td><td>1/2</td><td>√3</td></tr>
            <tr><td>90°</td><td>1</td><td>0</td><td>undefined</td></tr>
          </table>
        </div>
      </div>
    </section>

    {AD_SLOT("9901000002")}

    <section id="unit-circle" class="topic-section">
      <div class="section-header">
        <span class="sec-icon">⭕</span>
        <h2>The Unit Circle</h2>
        <span class="level-badge badge-secondary">Secondary</span>
      </div>
      <div class="section-body">
        <div class="sub">
          <h3>Definition</h3>
          <p>The unit circle is a circle of radius 1 centred at the origin. For any angle θ measured anticlockwise from the positive x-axis, the point on the circle is <strong>(cos θ, sin θ)</strong>.</p>
          <div class="formula-box">
            cos θ = x-coordinate &nbsp;&nbsp; sin θ = y-coordinate &nbsp;&nbsp; x² + y² = 1
          </div>
        </div>
        <div class="sub">
          <h3>CAST Diagram — Signs by Quadrant</h3>
          <table class="formula-table">
            <tr><th>Quadrant</th><th>Angle range</th><th>Positive functions</th></tr>
            <tr><td>I (All)</td><td>0° – 90°</td><td>sin, cos, tan all positive</td></tr>
            <tr><td>II (Sin)</td><td>90° – 180°</td><td>sin positive only</td></tr>
            <tr><td>III (Tan)</td><td>180° – 270°</td><td>tan positive only</td></tr>
            <tr><td>IV (Cos)</td><td>270° – 360°</td><td>cos positive only</td></tr>
          </table>
          <div class="callout tip"><span class="callout-icon">💡</span><span>Remember: <strong>"All Students Take Calculus"</strong> → All, Sin, Tan, Cos.</span></div>
        </div>
        <div class="sub">
          <h4>Examples</h4>
          <div class="example-grid">
            <div class="example-card">
              <div class="example-label">Example 1</div>
              <p>Find sin 150°.</p>
              <p class="soln">150° is in Quadrant II → sin is positive. sin 150° = sin(180°−150°) = sin 30° = 1/2</p>
            </div>
            <div class="example-card">
              <div class="example-label">Example 2</div>
              <p>Find cos 240°.</p>
              <p class="soln">240° is in Quadrant III → cos is negative. cos 240° = −cos(240°−180°) = −cos 60° = −1/2</p>
            </div>
            <div class="example-card">
              <div class="example-label">Example 3</div>
              <p>Find tan 315°.</p>
              <p class="soln">315° is in Quadrant IV → tan is negative. tan 315° = −tan(360°−315°) = −tan 45° = −1</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="identities" class="topic-section">
      <div class="section-header">
        <span class="sec-icon">🔗</span>
        <h2>Trigonometric Identities</h2>
        <span class="level-badge badge-secondary">Secondary</span>
      </div>
      <div class="section-body">
        <div class="sub">
          <h3>Pythagorean Identities</h3>
          <div class="formula-box highlight">
            sin²θ + cos²θ = 1<br>
            1 + tan²θ = sec²θ<br>
            1 + cot²θ = cosec²θ
          </div>
          <p>These come directly from the Pythagorean theorem applied to the unit circle. Divide the first identity by cos²θ to get the second, by sin²θ for the third.</p>
        </div>
        <div class="sub">
          <h3>Even & Odd Properties</h3>
          <div class="formula-box">
            sin(−θ) = −sin θ &nbsp; (odd) &nbsp;&nbsp; cos(−θ) = cos θ &nbsp; (even) &nbsp;&nbsp; tan(−θ) = −tan θ &nbsp; (odd)
          </div>
        </div>
        <div class="sub">
          <h3>Co-function Identities</h3>
          <div class="formula-box">
            sin(90°−θ) = cos θ &nbsp;&nbsp; cos(90°−θ) = sin θ &nbsp;&nbsp; tan(90°−θ) = cot θ
          </div>
          <div class="example-grid">
            <div class="example-card">
              <div class="example-label">Example 1 — Prove identity</div>
              <p>Prove: (sin²θ − cos²θ) = 1 − 2cos²θ</p>
              <p class="soln">LHS = sin²θ − cos²θ = (1 − cos²θ) − cos²θ = 1 − 2cos²θ = RHS ✓</p>
            </div>
            <div class="example-card">
              <div class="example-label">Example 2</div>
              <p>If sin θ = 5/13, find cos θ and tan θ (θ in Q1).</p>
              <p class="soln">cos θ = √(1 − 25/169) = √(144/169) = 12/13. &nbsp; tan θ = (5/13)/(12/13) = 5/12</p>
            </div>
            <div class="example-card">
              <div class="example-label">Example 3 — Simplify</div>
              <p>Simplify: (1 − sin²θ)/cos²θ</p>
              <p class="soln">= cos²θ/cos²θ = 1</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="sine-cosine-rules" class="topic-section">
      <div class="section-header">
        <span class="sec-icon">△</span>
        <h2>Sine Rule & Cosine Rule</h2>
        <span class="level-badge badge-secondary">Secondary</span>
      </div>
      <div class="section-body">
        <div class="sub">
          <h3>Sine Rule</h3>
          <p>Applies to <em>any</em> triangle. Use when you know: (i) two angles and one side, or (ii) two sides and a non-included angle.</p>
          <div class="formula-box highlight">
            a/sin A = b/sin B = c/sin C = 2R &nbsp; (R = circumradius)
          </div>
          <div class="example-grid">
            <div class="example-card">
              <div class="example-label">Example 1</div>
              <p>Triangle ABC: a = 7, A = 30°, B = 45°. Find b.</p>
              <p class="soln">b = a sin B / sin A = 7 × sin 45° / sin 30° = 7 × (√2/2) / (1/2) = 7√2 ≈ 9.90</p>
            </div>
          </div>
        </div>
        <div class="sub">
          <h3>Cosine Rule</h3>
          <p>Use when you know: (i) two sides and the included angle (SAS), or (ii) all three sides (SSS).</p>
          <div class="formula-box">
            a² = b² + c² − 2bc cos A &nbsp;&nbsp;&nbsp; cos A = (b² + c² − a²) / (2bc)
          </div>
          <div class="example-grid">
            <div class="example-card">
              <div class="example-label">Example 1 — SAS</div>
              <p>b = 5, c = 7, A = 60°. Find a.</p>
              <p class="soln">a² = 25 + 49 − 2(5)(7)cos 60° = 74 − 35 = 39 → a = √39 ≈ 6.24</p>
            </div>
            <div class="example-card">
              <div class="example-label">Example 2 — Area</div>
              <p>Find area of triangle with a = 5, b = 6, c = 7.</p>
              <p class="soln">s = 9, Area = √[9×4×3×2] = √216 ≈ 14.70</p>
            </div>
          </div>
        </div>
        <div class="sub">
          <h3>Area of a Triangle</h3>
          <div class="formula-box">
            Area = ½ ab sin C = ½ bc sin A = ½ ca sin B<br>
            Heron's formula: Area = √[s(s−a)(s−b)(s−c)], where s = (a+b+c)/2
          </div>
        </div>
      </div>
    </section>

    <section id="compound-angles" class="topic-section">
      <div class="section-header">
        <span class="sec-icon">➕</span>
        <h2>Compound & Multiple Angle Formulas</h2>
        <span class="level-badge badge-secondary">Secondary / A-Level</span>
      </div>
      <div class="section-body">
        <div class="sub">
          <h3>Addition Formulas</h3>
          <div class="formula-box">
            sin(A ± B) = sin A cos B ± cos A sin B<br>
            cos(A ± B) = cos A cos B ∓ sin A sin B<br>
            tan(A ± B) = (tan A ± tan B) / (1 ∓ tan A tan B)
          </div>
        </div>
        <div class="sub">
          <h3>Double Angle Formulas</h3>
          <div class="formula-box">
            sin 2A = 2 sin A cos A<br>
            cos 2A = cos²A − sin²A = 2cos²A − 1 = 1 − 2sin²A<br>
            tan 2A = 2 tan A / (1 − tan²A)
          </div>
        </div>
        <div class="sub">
          <h3>Half-Angle Formulas</h3>
          <div class="formula-box">
            sin(A/2) = ±√[(1−cos A)/2] &nbsp;&nbsp; cos(A/2) = ±√[(1+cos A)/2]<br>
            tan(A/2) = (1−cos A)/sin A = sin A/(1+cos A)
          </div>
          <div class="example-grid">
            <div class="example-card">
              <div class="example-label">Example — sin 75°</div>
              <p>Find sin 75° = sin(45° + 30°)</p>
              <p class="soln">= sin45°cos30° + cos45°sin30° = (√2/2)(√3/2) + (√2/2)(1/2) = (√6+√2)/4 ≈ 0.9659</p>
            </div>
            <div class="example-card">
              <div class="example-label">Example — Double angle</div>
              <p>If sin θ = 3/5, find sin 2θ and cos 2θ.</p>
              <p class="soln">cos θ = 4/5 → sin 2θ = 2(3/5)(4/5) = 24/25. cos 2θ = (4/5)²−(3/5)² = 7/25</p>
            </div>
          </div>
        </div>
        <div class="sub">
          <h3>Product-to-Sum & Sum-to-Product</h3>
          <div class="formula-box">
            sin A + sin B = 2 sin[(A+B)/2] cos[(A−B)/2]<br>
            sin A − sin B = 2 cos[(A+B)/2] sin[(A−B)/2]<br>
            cos A + cos B = 2 cos[(A+B)/2] cos[(A−B)/2]<br>
            cos A − cos B = −2 sin[(A+B)/2] sin[(A−B)/2]
          </div>
        </div>
      </div>
    </section>

    <section id="graphs" class="topic-section">
      <div class="section-header">
        <span class="sec-icon">📈</span>
        <h2>Trigonometric Graphs & Transformations</h2>
        <span class="level-badge badge-secondary">Secondary</span>
      </div>
      <div class="section-body">
        <div class="sub">
          <h3>Key Properties of y = a sin(bx + c) + d</h3>
          <table class="formula-table">
            <tr><th>Parameter</th><th>Effect</th></tr>
            <tr><td>a (amplitude)</td><td>Stretches vertically; max = a, min = −a</td></tr>
            <tr><td>b (frequency)</td><td>Period = 2π/b</td></tr>
            <tr><td>c (phase shift)</td><td>Horizontal shift of −c/b</td></tr>
            <tr><td>d (vertical shift)</td><td>Moves graph up/down by d</td></tr>
          </table>
        </div>
        <div class="sub">
          <h3>Graph Sketching Steps</h3>
          <ol class="sub"><li>Identify amplitude, period, phase shift, vertical shift</li><li>Mark key points at 0, T/4, T/2, 3T/4, T</li><li>Plot and join with smooth curve</li></ol>
          <div class="example-grid">
            <div class="example-card">
              <div class="example-label">Example — Describe y = 3sin(2x − π/6) + 1</div>
              <p>Find amplitude, period, phase shift, vertical shift.</p>
              <p class="soln">a=3, b=2, c=−π/6, d=1. Amplitude=3, Period=π, Phase shift=π/12 right, Vertical shift=1 up.</p>
            </div>
          </div>
        </div>
        <div class="sub">
          <h3>Solving Trig Equations</h3>
          <p>General solutions:</p>
          <div class="formula-box">
            sin x = k &nbsp;→&nbsp; x = arcsin(k) + 2nπ &nbsp; or &nbsp; x = π − arcsin(k) + 2nπ<br>
            cos x = k &nbsp;→&nbsp; x = ±arccos(k) + 2nπ<br>
            tan x = k &nbsp;→&nbsp; x = arctan(k) + nπ
          </div>
          <div class="example-grid">
            <div class="example-card">
              <div class="example-label">Example — Solve 2sin x − 1 = 0 for 0° ≤ x ≤ 360°</div>
              <p class="soln">sin x = 1/2 → x = 30° or x = 150°</p>
            </div>
            <div class="example-card">
              <div class="example-label">Example — Solve cos 2x = √3/2 for 0 ≤ x ≤ 2π</div>
              <p class="soln">2x = π/6, 11π/6, 2π+π/6, 2π+11π/6 → x = π/12, 11π/12, 13π/12, 23π/12</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="inverse-trig" class="topic-section">
      <div class="section-header">
        <span class="sec-icon">🔄</span>
        <h2>Inverse Trigonometric Functions</h2>
        <span class="level-badge badge-uni">University</span>
      </div>
      <div class="section-body">
        <div class="sub">
          <h3>Definitions & Domains</h3>
          <table class="formula-table">
            <tr><th>Function</th><th>Domain</th><th>Range</th></tr>
            <tr><td>arcsin x</td><td>[−1, 1]</td><td>[−π/2, π/2]</td></tr>
            <tr><td>arccos x</td><td>[−1, 1]</td><td>[0, π]</td></tr>
            <tr><td>arctan x</td><td>(−∞, ∞)</td><td>(−π/2, π/2)</td></tr>
          </table>
        </div>
        <div class="sub">
          <h3>Derivatives of Inverse Trig Functions</h3>
          <div class="formula-box">
            d/dx(arcsin x) = 1/√(1−x²) &nbsp;&nbsp; d/dx(arccos x) = −1/√(1−x²)<br>
            d/dx(arctan x) = 1/(1+x²) &nbsp;&nbsp; d/dx(arccot x) = −1/(1+x²)<br>
            d/dx(arcsec x) = 1/(|x|√(x²−1)) &nbsp;&nbsp; d/dx(arccsc x) = −1/(|x|√(x²−1))
          </div>
        </div>
        <div class="sub">
          <h3>Integration Results</h3>
          <div class="formula-box">
            ∫ 1/√(1−x²) dx = arcsin x + C<br>
            ∫ 1/(1+x²) dx = arctan x + C<br>
            ∫ 1/(a²+x²) dx = (1/a) arctan(x/a) + C<br>
            ∫ 1/√(a²−x²) dx = arcsin(x/a) + C
          </div>
          <div class="example-grid">
            <div class="example-card">
              <div class="example-label">Example — Differentiate y = arctan(3x)</div>
              <p class="soln">dy/dx = 3/(1+(3x)²) = 3/(1+9x²)</p>
            </div>
            <div class="example-card">
              <div class="example-label">Example — Evaluate ∫₀¹ 1/(1+x²) dx</div>
              <p class="soln">= [arctan x]₀¹ = arctan 1 − arctan 0 = π/4 − 0 = π/4</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="complex-trig" class="topic-section">
      <div class="section-header">
        <span class="sec-icon">🌀</span>
        <h2>Complex Exponentials & Hyperbolic Functions</h2>
        <span class="level-badge badge-uni">University</span>
      </div>
      <div class="section-body">
        <div class="sub">
          <h3>Euler's Formula</h3>
          <div class="formula-box highlight">
            e^(iθ) = cos θ + i sin θ &nbsp;&nbsp;&nbsp;&nbsp; e^(−iθ) = cos θ − i sin θ<br>
            cos θ = (e^(iθ) + e^(−iθ)) / 2 &nbsp;&nbsp; sin θ = (e^(iθ) − e^(−iθ)) / (2i)
          </div>
        </div>
        <div class="sub">
          <h3>Hyperbolic Functions</h3>
          <div class="formula-box">
            sinh x = (eˣ − e⁻ˣ)/2 &nbsp;&nbsp; cosh x = (eˣ + e⁻ˣ)/2 &nbsp;&nbsp; tanh x = sinh x/cosh x<br>
            cosh²x − sinh²x = 1
          </div>
        </div>
        <div class="sub">
          <h3>De Moivre's Theorem</h3>
          <div class="formula-box">
            (cos θ + i sin θ)ⁿ = cos(nθ) + i sin(nθ)
          </div>
          <div class="example-grid">
            <div class="example-card">
              <div class="example-label">Example — nth roots of unity</div>
              <p>Find the cube roots of 1 (i.e., z³ = 1).</p>
              <p class="soln">z = e^(2πki/3) for k = 0,1,2 → z = 1, e^(2πi/3), e^(4πi/3) = 1, −½+i√3/2, −½−i√3/2</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="fourier" class="topic-section">
      <div class="section-header">
        <span class="sec-icon">🎵</span>
        <h2>Fourier Series (University)</h2>
        <span class="level-badge badge-uni">University</span>
      </div>
      <div class="section-body">
        <div class="sub">
          <h3>Fourier Series Representation</h3>
          <p>Any periodic function f(x) with period 2L can be written as:</p>
          <div class="formula-box highlight">
            f(x) = a₀/2 + Σ[aₙ cos(nπx/L) + bₙ sin(nπx/L)]<br><br>
            aₙ = (1/L)∫₋ₗᴸ f(x) cos(nπx/L) dx<br>
            bₙ = (1/L)∫₋ₗᴸ f(x) sin(nπx/L) dx
          </div>
        </div>
        <div class="sub">
          <h3>Parseval's Theorem</h3>
          <div class="formula-box">
            (1/L)∫₋ₗᴸ |f(x)|² dx = a₀²/2 + Σ(aₙ² + bₙ²)
          </div>
        </div>
        <div class="sub">
          <h3>Applications</h3>
          <ul>
            <li>Signal processing and audio compression (MP3, JPEG use Fourier methods)</li>
            <li>Solving heat equation and wave equation (PDEs)</li>
            <li>Electrical engineering — AC circuit analysis</li>
            <li>Quantum mechanics — wavefunction decomposition</li>
          </ul>
          <div class="example-grid">
            <div class="example-card">
              <div class="example-label">Example — Square wave Fourier series</div>
              <p>f(x) = 1 for 0 &lt; x &lt; π, f(x) = −1 for −π &lt; x &lt; 0</p>
              <p class="soln">f(x) = (4/π)[sin x + sin(3x)/3 + sin(5x)/5 + ...] = (4/π) Σ sin((2n−1)x)/(2n−1)</p>
            </div>
          </div>
        </div>
      </div>
    </section>"""

topics.append({
    "filename": "trigonometry.html",
    "title": "Trigonometry",
    "icon": "📐",
    "sub": "From right triangles to Fourier series — complete guide",
    "levels": [("primary","Beginner"),("secondary","Secondary"),("uni","University")],
    "breadcrumb": "Trigonometry",
    "toc": trig_toc,
    "content": trig_content,
    "prev_link": "../math-lessons.html",
    "prev_label": "All Topics",
    "next_link": "algebra.html",
    "next_label": "Algebra",
    "id": "trigonometry"
})

# ══════════════════════ 2. ALGEBRA ══════════════════════
alg_toc = """
      <li class="toc-level">Beginner</li>
      <li><a href="#number-operations">Number Operations</a></li>
      <li><a href="#basic-algebra">Intro to Algebra</a></li>
      <li class="toc-level">Secondary</li>
      <li><a href="#linear-equations">Linear Equations</a></li>
      <li><a href="#quadratics">Quadratics</a></li>
      <li><a href="#polynomials">Polynomials</a></li>
      <li><a href="#inequalities">Inequalities</a></li>
      <li><a href="#logs">Logarithms</a></li>
      <li class="toc-level">University</li>
      <li><a href="#abstract-algebra">Abstract Algebra</a></li>
      <li><a href="#linear-algebra">Linear Algebra</a></li>"""

alg_content = f"""
    <section id="number-operations" class="topic-section">
      <div class="section-header">
        <span class="sec-icon">🔢</span>
        <h2>Number Operations & Properties</h2>
        <span class="level-badge badge-primary">Beginner</span>
      </div>
      <div class="section-body">
        <div class="sub">
          <h3>Fundamental Laws</h3>
          <div class="formula-box">
            Commutative: a + b = b + a &nbsp; | &nbsp; a × b = b × a<br>
            Associative: (a+b)+c = a+(b+c) &nbsp; | &nbsp; (ab)c = a(bc)<br>
            Distributive: a(b+c) = ab + ac
          </div>
        </div>
        <div class="sub">
          <h3>Types of Numbers</h3>
          <ul>
            <li><strong>Natural numbers (ℕ):</strong> 1, 2, 3, 4, ...</li>
            <li><strong>Integers (ℤ):</strong> ..., −2, −1, 0, 1, 2, ...</li>
            <li><strong>Rational numbers (ℚ):</strong> p/q where p, q ∈ ℤ, q ≠ 0</li>
            <li><strong>Irrational numbers:</strong> √2, π, e — cannot be expressed as fractions</li>
            <li><strong>Real numbers (ℝ):</strong> all rational and irrational numbers</li>
            <li><strong>Complex numbers (ℂ):</strong> a + bi where i = √(−1)</li>
          </ul>
        </div>
        <div class="sub">
          <h3>Laws of Indices / Exponents</h3>
          <div class="formula-box">
            aᵐ · aⁿ = aᵐ⁺ⁿ &nbsp;&nbsp; aᵐ/aⁿ = aᵐ⁻ⁿ &nbsp;&nbsp; (aᵐ)ⁿ = aᵐⁿ<br>
            (ab)ⁿ = aⁿbⁿ &nbsp;&nbsp; a⁰ = 1 &nbsp;&nbsp; a⁻ⁿ = 1/aⁿ &nbsp;&nbsp; a^(1/n) = ⁿ√a
          </div>
          <div class="example-grid">
            <div class="example-card">
              <div class="example-label">Example 1</div>
              <p>Simplify: 2³ × 2⁴ ÷ 2²</p>
              <p class="soln">= 2^(3+4−2) = 2⁵ = 32</p>
            </div>
            <div class="example-card">
              <div class="example-label">Example 2</div>
              <p>Simplify: (3x²y)³</p>
              <p class="soln">= 27x⁶y³</p>
            </div>
            <div class="example-card">
              <div class="example-label">Example 3</div>
              <p>Evaluate 8^(2/3)</p>
              <p class="soln">= (∛8)² = 2² = 4</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {AD_SLOT("9902000001")}

    <section id="basic-algebra" class="topic-section">
      <div class="section-header">
        <span class="sec-icon">✏️</span>
        <h2>Introduction to Algebra</h2>
        <span class="level-badge badge-primary">Beginner</span>
      </div>
      <div class="section-body">
        <div class="sub">
          <h3>Algebraic Expressions</h3>
          <p>Algebra uses letters to represent unknown quantities. A term is a number, variable, or product of both. Like terms have the same variable(s) and power(s).</p>
          <div class="formula-box">
            3x + 5x = 8x &nbsp; (like terms) &nbsp;&nbsp;&nbsp; 3x + 5y cannot be simplified &nbsp; (unlike terms)
          </div>
          <div class="example-grid">
            <div class="example-card">
              <div class="example-label">Example — Expand and simplify</div>
              <p>Simplify: 3(2x + 4) − 2(x − 3)</p>
              <p class="soln">= 6x + 12 − 2x + 6 = 4x + 18</p>
            </div>
          </div>
        </div>
        <div class="sub">
          <h3>Algebraic Identities</h3>
          <div class="formula-box">
            (a + b)² = a² + 2ab + b² &nbsp;&nbsp; (a − b)² = a² − 2ab + b²<br>
            (a + b)(a − b) = a² − b²<br>
            (a + b)³ = a³ + 3a²b + 3ab² + b³<br>
            a³ + b³ = (a + b)(a² − ab + b²) &nbsp;&nbsp; a³ − b³ = (a − b)(a² + ab + b²)
          </div>
          <div class="example-grid">
            <div class="example-card">
              <div class="example-label">Example — (x + 3)²</div>
              <p class="soln">= x² + 6x + 9</p>
            </div>
            <div class="example-card">
              <div class="example-label">Example — Factor 25x² − 16</div>
              <p class="soln">= (5x − 4)(5x + 4) [difference of squares]</p>
            </div>
            <div class="example-card">
              <div class="example-label">Example — Factor x³ − 8</div>
              <p class="soln">= (x − 2)(x² + 2x + 4)</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="linear-equations" class="topic-section">
      <div class="section-header">
        <span class="sec-icon">📏</span>
        <h2>Linear Equations & Simultaneous Equations</h2>
        <span class="level-badge badge-secondary">Secondary</span>
      </div>
      <div class="section-body">
        <div class="sub">
          <h3>Solving Linear Equations</h3>
          <div class="formula-box">ax + b = c &nbsp;→&nbsp; x = (c − b)/a</div>
          <div class="example-grid">
            <div class="example-card">
              <div class="example-label">Example 1</div>
              <p>Solve: 3x + 7 = 19</p>
              <p class="soln">3x = 12 → x = 4</p>
            </div>
            <div class="example-card">
              <div class="example-label">Example 2 — Word problem</div>
              <p>A number doubled and increased by 5 equals 21. Find the number.</p>
              <p class="soln">2x + 5 = 21 → x = 8</p>
            </div>
          </div>
        </div>
        <div class="sub">
          <h3>Simultaneous Equations</h3>
          <p>Methods: <strong>Substitution, Elimination, Matrix method</strong>.</p>
          <div class="example-grid">
            <div class="example-card">
              <div class="example-label">Example — Elimination</div>
              <p>Solve: 2x + 3y = 13, 4x − y = 5</p>
              <p class="soln">Multiply 2nd by 3: 12x − 3y = 15. Add to 1st: 14x = 28 → x = 2. Then y = 3.</p>
            </div>
            <div class="example-card">
              <div class="example-label">Example — 3 variables</div>
              <p>Solve: x + y + z = 6, 2x − y + z = 3, x + 2y − z = 2</p>
              <p class="soln">Use elimination: x = 1, y = 2, z = 3</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="quadratics" class="topic-section">
      <div class="section-header">
        <span class="sec-icon">⌒</span>
        <h2>Quadratic Equations & Functions</h2>
        <span class="level-badge badge-secondary">Secondary</span>
      </div>
      <div class="section-body">
        <div class="sub">
          <h3>The Quadratic Formula</h3>
          <div class="formula-box highlight">
            ax² + bx + c = 0 &nbsp;→&nbsp; x = (−b ± √(b² − 4ac)) / 2a
          </div>
          <h4>Discriminant Δ = b² − 4ac</h4>
          <table class="formula-table">
            <tr><th>Δ value</th><th>Nature of roots</th></tr>
            <tr><td>Δ &gt; 0</td><td>Two distinct real roots</td></tr>
            <tr><td>Δ = 0</td><td>One repeated real root</td></tr>
            <tr><td>Δ &lt; 0</td><td>Two complex conjugate roots</td></tr>
          </table>
          <div class="example-grid">
            <div class="example-card">
              <div class="example-label">Example 1 — Two real roots</div>
              <p>Solve x² − 5x + 6 = 0</p>
              <p class="soln">Δ = 25 − 24 = 1 → x = (5 ± 1)/2 → x = 3 or x = 2</p>
            </div>
            <div class="example-card">
              <div class="example-label">Example 2 — Factoring</div>
              <p>Factor 6x² + 11x + 4</p>
              <p class="soln">= (3x + 4)(2x + 1)</p>
            </div>
            <div class="example-card">
              <div class="example-label">Example 3 — Complex roots</div>
              <p>Solve x² + 2x + 5 = 0</p>
              <p class="soln">Δ = 4 − 20 = −16 → x = (−2 ± 4i)/2 = −1 ± 2i</p>
            </div>
          </div>
        </div>
        <div class="sub">
          <h3>Completing the Square</h3>
          <p>Write ax² + bx + c = a(x + b/2a)² + (c − b²/4a)</p>
          <div class="formula-box">
            Vertex form: y = a(x − h)² + k where (h, k) is the vertex
          </div>
          <div class="example-grid">
            <div class="example-card">
              <div class="example-label">Example — Complete the square</div>
              <p>Write x² + 6x + 2 in vertex form.</p>
              <p class="soln">= (x + 3)² − 9 + 2 = (x + 3)² − 7. Vertex: (−3, −7)</p>
            </div>
          </div>
        </div>
        <div class="sub">
          <h3>Vieta's Formulas — Sum & Product of Roots</h3>
          <div class="formula-box">
            If roots are α and β: &nbsp; α + β = −b/a &nbsp;&nbsp; αβ = c/a
          </div>
        </div>
      </div>
    </section>

    <section id="polynomials" class="topic-section">
      <div class="section-header">
        <span class="sec-icon">🧮</span>
        <h2>Polynomials & Rational Functions</h2>
        <span class="level-badge badge-secondary">Secondary / A-Level</span>
      </div>
      <div class="section-body">
        <div class="sub">
          <h3>Factor Theorem & Remainder Theorem</h3>
          <div class="formula-box">
            Remainder Theorem: When p(x) is divided by (x − a), remainder = p(a)<br>
            Factor Theorem: (x − a) is a factor of p(x) if and only if p(a) = 0
          </div>
          <div class="example-grid">
            <div class="example-card">
              <div class="example-label">Example — Factor theorem</div>
              <p>Show (x − 2) is a factor of x³ − 3x² + x + 2, then fully factor.</p>
              <p class="soln">p(2) = 8 − 12 + 2 + 2 = 0 ✓ → divide to get (x−2)(x²−x−1)</p>
            </div>
          </div>
        </div>
        <div class="sub">
          <h3>Partial Fractions</h3>
          <div class="formula-box">
            p(x)/[(x−a)(x−b)] = A/(x−a) + B/(x−b)<br>
            p(x)/[(x−a)(x−b)²] = A/(x−a) + B/(x−b) + C/(x−b)²<br>
            p(x)/[(x−a)(x²+b)] = A/(x−a) + (Bx+C)/(x²+b)
          </div>
          <div class="example-grid">
            <div class="example-card">
              <div class="example-label">Example — Decompose 5x/[(x−1)(x+2)]</div>
              <p class="soln">5x = A(x+2) + B(x−1). Let x=1: 5=3A→A=5/3. Let x=−2: −10=−3B→B=10/3. Answer: (5/3)/(x−1) + (10/3)/(x+2)</p>
            </div>
          </div>
        </div>
        <div class="sub">
          <h3>Binomial Theorem</h3>
          <div class="formula-box">
            (a + b)ⁿ = Σ C(n,r) aⁿ⁻ʳ bʳ &nbsp;&nbsp; C(n,r) = n! / [r!(n−r)!]<br>
            (1 + x)ⁿ ≈ 1 + nx + n(n−1)x²/2! + ... (valid for |x| &lt; 1)
          </div>
          <div class="example-grid">
            <div class="example-card">
              <div class="example-label">Example — Expand (2x + 3)⁴</div>
              <p class="soln">= C(4,0)(2x)⁴ + C(4,1)(2x)³(3) + C(4,2)(2x)²(9) + C(4,3)(2x)(27) + C(4,4)(81) = 16x⁴ + 96x³ + 216x² + 216x + 81</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="inequalities" class="topic-section">
      <div class="section-header">
        <span class="sec-icon">≤</span>
        <h2>Inequalities & Functions</h2>
        <span class="level-badge badge-secondary">Secondary</span>
      </div>
      <div class="section-body">
        <div class="sub">
          <h3>Linear Inequalities</h3>
          <div class="callout warn"><span class="callout-icon">⚠️</span><span>When multiplying or dividing by a negative number, <strong>flip the inequality sign!</strong></span></div>
          <div class="example-grid">
            <div class="example-card">
              <div class="example-label">Example</div>
              <p>Solve: −2x + 5 &gt; 11</p>
              <p class="soln">−2x &gt; 6 → x &lt; −3 (flip sign when dividing by −2)</p>
            </div>
          </div>
        </div>
        <div class="sub">
          <h3>Quadratic Inequalities</h3>
          <div class="example-grid">
            <div class="example-card">
              <div class="example-label">Example — Solve x² − 4x − 5 &gt; 0</div>
              <p class="soln">Factor: (x−5)(x+1) &gt; 0. Roots: x = 5, x = −1. Sign chart → solution: x &lt; −1 or x &gt; 5</p>
            </div>
          </div>
        </div>
        <div class="sub">
          <h3>Functions: Domain, Range, Composition, Inverse</h3>
          <div class="formula-box">
            Composite function: (f∘g)(x) = f(g(x))<br>
            Inverse: f⁻¹(x) exists iff f is one-to-one. f(f⁻¹(x)) = x
          </div>
          <div class="example-grid">
            <div class="example-card">
              <div class="example-label">Example — Find inverse of f(x) = (2x + 3)/5</div>
              <p class="soln">y = (2x+3)/5 → 5y = 2x+3 → x = (5y−3)/2 → f⁻¹(x) = (5x−3)/2</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="logs" class="topic-section">
      <div class="section-header">
        <span class="sec-icon">log</span>
        <h2>Logarithms & Exponential Functions</h2>
        <span class="level-badge badge-secondary">Secondary / A-Level</span>
      </div>
      <div class="section-body">
        <div class="sub">
          <h3>Logarithm Laws</h3>
          <div class="formula-box highlight">
            log(ab) = log a + log b &nbsp;&nbsp; log(a/b) = log a − log b<br>
            log(aⁿ) = n log a &nbsp;&nbsp; log_b(x) = ln x / ln b<br>
            a^(log_a x) = x &nbsp;&nbsp; log_a(aˣ) = x &nbsp;&nbsp; log_a 1 = 0 &nbsp;&nbsp; log_a a = 1
          </div>
          <div class="example-grid">
            <div class="example-card">
              <div class="example-label">Example 1</div>
              <p>Simplify log 20 + log 5 − log 2</p>
              <p class="soln">= log(20×5/2) = log 50</p>
            </div>
            <div class="example-card">
              <div class="example-label">Example 2 — Solve exponential equation</div>
              <p>Solve 3^(x+1) = 27</p>
              <p class="soln">3^(x+1) = 3³ → x + 1 = 3 → x = 2</p>
            </div>
            <div class="example-card">
              <div class="example-label">Example 3 — Natural log</div>
              <p>Solve e^(2x) = 7</p>
              <p class="soln">2x = ln 7 → x = ln 7 / 2 ≈ 0.973</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {AD_SLOT("9902000002")}

    <section id="abstract-algebra" class="topic-section">
      <div class="section-header">
        <span class="sec-icon">🏗️</span>
        <h2>Abstract Algebra (University)</h2>
        <span class="level-badge badge-uni">University</span>
      </div>
      <div class="section-body">
        <div class="sub">
          <h3>Groups</h3>
          <p>A group (G, ∗) satisfies four axioms:</p>
          <ul>
            <li><strong>Closure:</strong> a, b ∈ G → a∗b ∈ G</li>
            <li><strong>Associativity:</strong> (a∗b)∗c = a∗(b∗c)</li>
            <li><strong>Identity:</strong> ∃ e ∈ G such that a∗e = e∗a = a</li>
            <li><strong>Inverse:</strong> ∀ a ∈ G, ∃ a⁻¹ such that a∗a⁻¹ = e</li>
          </ul>
          <p>If additionally a∗b = b∗a, the group is <strong>abelian (commutative)</strong>.</p>
        </div>
        <div class="sub">
          <h3>Rings & Fields</h3>
          <ul>
            <li><strong>Ring (R, +, ·):</strong> abelian group under +, associative and distributive under ·</li>
            <li><strong>Field:</strong> commutative ring where every nonzero element has a multiplicative inverse (e.g., ℚ, ℝ, ℂ, ℤ_p for prime p)</li>
          </ul>
        </div>
        <div class="sub">
          <h3>Homomorphisms & Isomorphisms</h3>
          <div class="formula-box">
            Homomorphism: f: G → H with f(a∗b) = f(a)∗f(b)<br>
            Isomorphism: bijective homomorphism. G ≅ H means G and H have same structure.
          </div>
        </div>
      </div>
    </section>

    <section id="linear-algebra" class="topic-section">
      <div class="section-header">
        <span class="sec-icon">⟨⟩</span>
        <h2>Linear Algebra (University)</h2>
        <span class="level-badge badge-uni">University</span>
      </div>
      <div class="section-body">
        <div class="sub">
          <h3>Vector Spaces</h3>
          <p>A vector space V over field F satisfies closure under addition and scalar multiplication, plus 8 axioms including commutativity, associativity, distributivity, and existence of zero vector and additive inverses.</p>
        </div>
        <div class="sub">
          <h3>Eigenvalues & Eigenvectors</h3>
          <div class="formula-box highlight">
            Av = λv &nbsp;→&nbsp; (A − λI)v = 0 &nbsp;→&nbsp; det(A − λI) = 0 (characteristic equation)
          </div>
          <div class="example-grid">
            <div class="example-card">
              <div class="example-label">Example — Find eigenvalues of A = [[2,1],[1,2]]</div>
              <p class="soln">det(A−λI) = (2−λ)²−1 = 0 → λ² − 4λ + 3 = 0 → λ = 1 or λ = 3</p>
            </div>
          </div>
        </div>
        <div class="sub">
          <h3>Linear Transformations</h3>
          <p>T: V → W is linear if T(αu + βv) = αT(u) + βT(v). Any linear transformation from ℝⁿ to ℝᵐ can be represented as matrix multiplication.</p>
        </div>
      </div>
    </section>"""

topics.append({
    "filename": "algebra.html",
    "title": "Algebra",
    "icon": "🔢",
    "sub": "From number laws to abstract algebra — complete guide",
    "levels": [("primary","Beginner"),("secondary","Secondary"),("uni","University")],
    "breadcrumb": "Algebra",
    "toc": alg_toc,
    "content": alg_content,
    "prev_link": "trigonometry.html",
    "prev_label": "Trigonometry",
    "next_link": "conics.html",
    "next_label": "Conics",
    "id": "algebra"
})

# ══════════════════════ 3. CONICS ══════════════════════
conics_toc = """
      <li class="toc-level">Introduction</li>
      <li><a href="#conics-intro">What are Conics?</a></li>
      <li class="toc-level">Secondary</li>
      <li><a href="#circle">Circle</a></li>
      <li><a href="#parabola">Parabola</a></li>
      <li><a href="#ellipse">Ellipse</a></li>
      <li><a href="#hyperbola">Hyperbola</a></li>
      <li class="toc-level">University</li>
      <li><a href="#polar-conics">Polar Form</a></li>
      <li><a href="#conics-3d">3D Quadrics</a></li>"""

conics_content = f"""
    <section id="conics-intro" class="topic-section">
      <div class="section-header">
        <span class="sec-icon">✂️</span>
        <h2>Introduction to Conic Sections</h2>
        <span class="level-badge badge-all">All Levels</span>
      </div>
      <div class="section-body">
        <div class="sub">
          <h3>What are Conic Sections?</h3>
          <p>Conic sections are curves formed by the intersection of a plane with a double-napped cone. Depending on the angle of the plane, we get a circle, ellipse, parabola, or hyperbola.</p>
          <div class="formula-box">
            General second-degree equation: Ax² + Bxy + Cy² + Dx + Ey + F = 0<br>
            Discriminant Δ = B² − 4AC:<br>
            &nbsp; Δ &lt; 0, A=C, B=0 → Circle &nbsp;&nbsp; Δ &lt; 0 → Ellipse<br>
            &nbsp; Δ = 0 → Parabola &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Δ &gt; 0 → Hyperbola
          </div>
          <h4>Unified Focus-Directrix Definition</h4>
          <p>For any point P on a conic, PF/PQ = e, where F is the focus and PQ is the perpendicular distance to the directrix.</p>
          <table class="formula-table">
            <tr><th>Conic</th><th>Eccentricity e</th></tr>
            <tr><td>Circle</td><td>e = 0</td></tr>
            <tr><td>Ellipse</td><td>0 &lt; e &lt; 1</td></tr>
            <tr><td>Parabola</td><td>e = 1</td></tr>
            <tr><td>Hyperbola</td><td>e &gt; 1</td></tr>
          </table>
        </div>
      </div>
    </section>

    {AD_SLOT("9903000001")}

    <section id="circle" class="topic-section">
      <div class="section-header">
        <span class="sec-icon">⭕</span>
        <h2>The Circle</h2>
        <span class="level-badge badge-secondary">Secondary</span>
      </div>
      <div class="section-body">
        <div class="sub">
          <h3>Standard & General Forms</h3>
          <div class="formula-box highlight">
            Standard: (x − h)² + (y − k)² = r² &nbsp;&nbsp; [centre (h,k), radius r]<br>
            General: x² + y² + 2gx + 2fy + c = 0 &nbsp;&nbsp; [centre (−g,−f), radius √(g²+f²−c)]
          </div>
          <div class="example-grid">
            <div class="example-card">
              <div class="example-label">Example 1 — Convert to standard form</div>
              <p>x² + y² − 4x + 6y + 9 = 0</p>
              <p class="soln">Complete square: (x−2)² + (y+3)² = 4. Centre (2,−3), radius 2.</p>
            </div>
            <div class="example-card">
              <div class="example-label">Example 2 — Find tangent at point</div>
              <p>Find tangent to x² + y² = 25 at (3, 4).</p>
              <p class="soln">Tangent: 3x + 4y = 25</p>
            </div>
            <div class="example-card">
              <div class="example-label">Example 3 — Circle through 3 points</div>
              <p>Find circle through (0,0), (4,0), (0,3).</p>
              <p class="soln">x² + y² + Dx + Ey + F = 0. Use points to get D=−4, E=−3, F=0. Centre (2, 3/2), radius 5/2.</p>
            </div>
          </div>
        </div>
        <div class="sub">
          <h3>Chord, Tangent, Normal</h3>
          <div class="formula-box">
            Tangent at (x₁, y₁) on x² + y² = r²: &nbsp; xx₁ + yy₁ = r²<br>
            Length of tangent from (h,k) to x² + y² = r²: &nbsp; √(h² + k² − r²)
          </div>
        </div>
      </div>
    </section>

    <section id="parabola" class="topic-section">
      <div class="section-header">
        <span class="sec-icon">⌒</span>
        <h2>The Parabola</h2>
        <span class="level-badge badge-secondary">Secondary</span>
      </div>
      <div class="section-body">
        <div class="sub">
          <h3>Standard Forms</h3>
          <div class="formula-box">
            Vertical axis: x² = 4ay &nbsp; [vertex (0,0), focus (0,a), directrix y = −a]<br>
            Horizontal axis: y² = 4ax &nbsp; [vertex (0,0), focus (a,0), directrix x = −a]<br>
            General: (x−h)² = 4a(y−k) or (y−k)² = 4a(x−h)
          </div>
          <div class="example-grid">
            <div class="example-card">
              <div class="example-label">Example 1 — Identify elements of y² = 12x</div>
              <p class="soln">4a = 12 → a = 3. Focus: (3, 0). Directrix: x = −3. Latus rectum = 12.</p>
            </div>
            <div class="example-card">
              <div class="example-label">Example 2 — Find equation from focus and directrix</div>
              <p>Focus (0, 3), directrix y = −3.</p>
              <p class="soln">a = 3, vertex at origin → x² = 12y</p>
            </div>
          </div>
        </div>
        <div class="sub">
          <h3>Parametric Form & Tangent</h3>
          <div class="formula-box">
            Parametric: x = at², y = 2at &nbsp; [for y² = 4ax]<br>
            Tangent at parameter t: ty = x + at²<br>
            Normal at parameter t: y = −tx + 2at + at³
          </div>
        </div>
      </div>
    </section>

    <section id="ellipse" class="topic-section">
      <div class="section-header">
        <span class="sec-icon">🥚</span>
        <h2>The Ellipse</h2>
        <span class="level-badge badge-secondary">Secondary / A-Level</span>
      </div>
      <div class="section-body">
        <div class="sub">
          <h3>Standard Form</h3>
          <div class="formula-box highlight">
            x²/a² + y²/b² = 1 &nbsp; (a &gt; b &gt; 0)<br>
            c² = a² − b² &nbsp;&nbsp; Eccentricity e = c/a &nbsp; (0 &lt; e &lt; 1)<br>
            Foci: (±c, 0) &nbsp;&nbsp; Vertices: (±a, 0) &nbsp;&nbsp; Co-vertices: (0, ±b)<br>
            Latus rectum length: 2b²/a
          </div>
          <div class="example-grid">
            <div class="example-card">
              <div class="example-label">Example 1 — x²/25 + y²/9 = 1</div>
              <p class="soln">a=5, b=3, c=√16=4. Foci: (±4,0). e = 4/5 = 0.8</p>
            </div>
            <div class="example-card">
              <div class="example-label">Example 2 — Find equation</div>
              <p>Foci (±3, 0), semi-major axis a = 5.</p>
              <p class="soln">b² = 25 − 9 = 16 → x²/25 + y²/16 = 1</p>
            </div>
          </div>
        </div>
        <div class="sub">
          <h3>Tangent to Ellipse at (x₁, y₁)</h3>
          <div class="formula-box">xx₁/a² + yy₁/b² = 1</div>
        </div>
      </div>
    </section>

    <section id="hyperbola" class="topic-section">
      <div class="section-header">
        <span class="sec-icon">↔️</span>
        <h2>The Hyperbola</h2>
        <span class="level-badge badge-secondary">Secondary / A-Level</span>
      </div>
      <div class="section-body">
        <div class="sub">
          <h3>Standard Form</h3>
          <div class="formula-box highlight">
            x²/a² − y²/b² = 1 &nbsp; (transverse axis along x)<br>
            c² = a² + b² &nbsp;&nbsp; e = c/a &gt; 1<br>
            Foci: (±c, 0) &nbsp;&nbsp; Asymptotes: y = ±(b/a)x
          </div>
          <div class="example-grid">
            <div class="example-card">
              <div class="example-label">Example — x²/9 − y²/16 = 1</div>
              <p class="soln">a=3, b=4, c=5. Foci: (±5, 0). e=5/3. Asymptotes: y = ±(4/3)x</p>
            </div>
          </div>
        </div>
        <div class="sub">
          <h3>Rectangular Hyperbola</h3>
          <div class="formula-box">xy = c² &nbsp; Parametric: x = ct, y = c/t</div>
        </div>
      </div>
    </section>

    <section id="polar-conics" class="topic-section">
      <div class="section-header">
        <span class="sec-icon">🌀</span>
        <h2>Polar Form of Conics</h2>
        <span class="level-badge badge-uni">University</span>
      </div>
      <div class="section-body">
        <div class="sub">
          <h3>Unified Polar Equation</h3>
          <div class="formula-box highlight">
            r = ed / (1 − e cos θ) &nbsp; or &nbsp; r = ed / (1 − e sin θ)<br>
            where e = eccentricity, d = distance from focus to directrix
          </div>
          <div class="example-grid">
            <div class="example-card">
              <div class="example-label">Example — Identify r = 6/(2 − cos θ)</div>
              <p class="soln">Rewrite: r = 3/(1 − ½cosθ). e = ½ &lt; 1 → Ellipse with semi-latus rectum = 3.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="conics-3d" class="topic-section">
      <div class="section-header">
        <span class="sec-icon">🌐</span>
        <h2>3D Quadric Surfaces</h2>
        <span class="level-badge badge-uni">University</span>
      </div>
      <div class="section-body">
        <div class="sub">
          <h3>Common Quadric Surfaces</h3>
          <table class="formula-table">
            <tr><th>Surface</th><th>Equation</th></tr>
            <tr><td>Sphere</td><td>x² + y² + z² = r²</td></tr>
            <tr><td>Ellipsoid</td><td>x²/a² + y²/b² + z²/c² = 1</td></tr>
            <tr><td>Elliptic paraboloid</td><td>z = x²/a² + y²/b²</td></tr>
            <tr><td>Hyperbolic paraboloid (saddle)</td><td>z = x²/a² − y²/b²</td></tr>
            <tr><td>Cone</td><td>z² = x²/a² + y²/b²</td></tr>
            <tr><td>Hyperboloid (1 sheet)</td><td>x²/a² + y²/b² − z²/c² = 1</td></tr>
          </table>
        </div>
      </div>
    </section>"""

topics.append({
    "filename": "conics.html",
    "title": "Conic Sections",
    "icon": "✂️",
    "sub": "Circles, parabolas, ellipses, hyperbolas and beyond",
    "levels": [("primary","Secondary"),("secondary","A-Level"),("uni","University")],
    "breadcrumb": "Conic Sections",
    "toc": conics_toc,
    "content": conics_content,
    "prev_link": "algebra.html",
    "prev_label": "Algebra",
    "next_link": "statistics.html",
    "next_label": "Statistics",
    "id": "conics"
})

# ══════════════════════ 4. STATISTICS ══════════════════════
stats_toc = """
      <li class="toc-level">Beginner</li>
      <li><a href="#data-collection">Data Collection</a></li>
      <li><a href="#central-tendency">Central Tendency</a></li>
      <li class="toc-level">Secondary</li>
      <li><a href="#dispersion">Dispersion</a></li>
      <li><a href="#probability">Probability</a></li>
      <li><a href="#distributions">Distributions</a></li>
      <li class="toc-level">University</li>
      <li><a href="#hypothesis">Hypothesis Testing</a></li>
      <li><a href="#regression">Regression & Correlation</a></li>"""

stats_content = f"""
    <section id="data-collection" class="topic-section">
      <div class="section-header"><span class="sec-icon">📊</span><h2>Data Collection & Presentation</h2><span class="level-badge badge-primary">Beginner</span></div>
      <div class="section-body">
        <div class="sub"><h3>Types of Data</h3>
          <ul><li><strong>Qualitative/Categorical:</strong> colours, names, yes/no answers</li>
          <li><strong>Quantitative:</strong> Discrete (countable: 1,2,3...) or Continuous (measurable: heights, weights)</li>
          <li><strong>Primary data:</strong> collected directly. <strong>Secondary:</strong> from existing sources</li></ul>
        </div>
        <div class="sub"><h3>Frequency Tables, Bar Charts, Histograms, Pie Charts</h3>
          <div class="callout note"><span class="callout-icon">📝</span><span>In a histogram, area = frequency. Bars touch. Used for continuous data. Bar charts have gaps and are for discrete/categorical data.</span></div>
        </div>
      </div>
    </section>

    {AD_SLOT("9904000001")}

    <section id="central-tendency" class="topic-section">
      <div class="section-header"><span class="sec-icon">🎯</span><h2>Measures of Central Tendency</h2><span class="level-badge badge-primary">Beginner / Secondary</span></div>
      <div class="section-body">
        <div class="sub">
          <h3>Mean, Median, Mode</h3>
          <div class="formula-box highlight">
            Mean: x̄ = Σx / n &nbsp;&nbsp;&nbsp; Weighted mean: x̄ = Σ(fx) / Σf<br>
            Median: middle value (odd n), or average of two middle values (even n)<br>
            Mode: most frequently occurring value
          </div>
          <div class="example-grid">
            <div class="example-card"><div class="example-label">Example 1</div>
              <p>Data: 4, 7, 7, 9, 12. Find mean, median, mode.</p>
              <p class="soln">Mean = 39/5 = 7.8. Median = 7. Mode = 7.</p></div>
            <div class="example-card"><div class="example-label">Example 2 — Grouped data mean</div>
              <p>Class: 10–20 (f=3), 20–30 (f=5), 30–40 (f=2). Find mean.</p>
              <p class="soln">x̄ = (15×3 + 25×5 + 35×2)/10 = (45+125+70)/10 = 24</p></div>
          </div>
        </div>
      </div>
    </section>

    <section id="dispersion" class="topic-section">
      <div class="section-header"><span class="sec-icon">📏</span><h2>Measures of Dispersion</h2><span class="level-badge badge-secondary">Secondary</span></div>
      <div class="section-body">
        <div class="sub">
          <div class="formula-box highlight">
            Range = max − min<br>
            Variance: σ² = Σ(x − x̄)²/n &nbsp;&nbsp; (population) &nbsp;&nbsp; s² = Σ(x − x̄)²/(n−1) &nbsp; (sample)<br>
            Standard deviation: σ = √(variance)<br>
            IQR = Q3 − Q1 &nbsp;&nbsp; Coefficient of variation: CV = (σ/x̄) × 100%
          </div>
          <div class="example-grid">
            <div class="example-card"><div class="example-label">Example — Find SD</div>
              <p>Data: 2, 4, 4, 4, 5, 5, 7, 9</p>
              <p class="soln">x̄ = 5. Deviations²: 9,1,1,1,0,0,4,16. σ² = 32/8 = 4. σ = 2.</p></div>
          </div>
        </div>
        <div class="sub"><h3>Box Plots & Five Number Summary</h3>
          <div class="formula-box">Min, Q1, Median (Q2), Q3, Max. IQR = Q3 − Q1. Outlier: &lt; Q1−1.5×IQR or &gt; Q3+1.5×IQR</div>
        </div>
      </div>
    </section>

    <section id="probability" class="topic-section">
      <div class="section-header"><span class="sec-icon">🎲</span><h2>Probability</h2><span class="level-badge badge-secondary">Secondary</span></div>
      <div class="section-body">
        <div class="sub">
          <div class="formula-box highlight">
            P(A) = favourable outcomes / total equally likely outcomes &nbsp;&nbsp; 0 ≤ P(A) ≤ 1<br>
            P(A∪B) = P(A) + P(B) − P(A∩B) &nbsp; (Addition law)<br>
            P(A∩B) = P(A) × P(B|A) &nbsp; (Multiplication law)<br>
            P(A|B) = P(A∩B)/P(B) &nbsp; (Conditional probability)<br>
            Independent events: P(A∩B) = P(A)×P(B)
          </div>
          <div class="example-grid">
            <div class="example-card"><div class="example-label">Example — Two dice</div>
              <p>P(sum = 7) when rolling two dice?</p>
              <p class="soln">Favourable outcomes: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) = 6. P = 6/36 = 1/6.</p></div>
            <div class="example-card"><div class="example-label">Example — Bayes' Theorem</div>
              <p>Disease test: P(+|Disease) = 0.99, P(+|No disease) = 0.05, P(Disease) = 0.01. Find P(Disease|+).</p>
              <p class="soln">P(+) = 0.99×0.01 + 0.05×0.99 = 0.0594. P(D|+) = 0.0099/0.0594 ≈ 0.167.</p></div>
          </div>
        </div>
        <div class="sub"><h3>Permutations & Combinations</h3>
          <div class="formula-box">
            Permutations (ordered): P(n,r) = n!/(n−r)!<br>
            Combinations (unordered): C(n,r) = n!/[r!(n−r)!]
          </div>
          <div class="example-grid">
            <div class="example-card"><div class="example-label">Example — How many ways to choose 3 from 8?</div>
              <p class="soln">C(8,3) = 56</p></div>
          </div>
        </div>
      </div>
    </section>

    <section id="distributions" class="topic-section">
      <div class="section-header"><span class="sec-icon">📉</span><h2>Probability Distributions</h2><span class="level-badge badge-secondary">Secondary / A-Level</span></div>
      <div class="section-body">
        <div class="sub"><h3>Binomial Distribution</h3>
          <div class="formula-box">P(X=r) = C(n,r) pʳ (1−p)ⁿ⁻ʳ &nbsp;&nbsp; Mean = np &nbsp;&nbsp; Variance = np(1−p)</div>
          <div class="example-grid">
            <div class="example-card"><div class="example-label">Example — Fair coin tossed 10 times. P(exactly 6 heads)?</div>
              <p class="soln">P = C(10,6)(0.5)⁶(0.5)⁴ = 210 × (0.5)¹⁰ = 210/1024 ≈ 0.205</p></div>
          </div>
        </div>
        <div class="sub"><h3>Normal Distribution N(μ, σ²)</h3>
          <div class="formula-box highlight">
            f(x) = (1/σ√(2π)) e^(−(x−μ)²/2σ²)<br>
            Standardise: Z = (X − μ)/σ &nbsp;&nbsp; (Z ~ N(0,1))<br>
            68−95−99.7 rule: 1σ, 2σ, 3σ from mean
          </div>
          <div class="example-grid">
            <div class="example-card"><div class="example-label">Example — Heights N(170, 9). P(height &gt; 173)?</div>
              <p class="soln">Z = (173−170)/3 = 1. P(Z &gt; 1) = 1 − Φ(1) = 1 − 0.8413 = 0.1587 ≈ 15.87%</p></div>
          </div>
        </div>
        <div class="sub"><h3>Poisson Distribution</h3>
          <div class="formula-box">P(X=k) = e^(−λ) λᵏ/k! &nbsp;&nbsp; Mean = Variance = λ</div>
        </div>
      </div>
    </section>

    {AD_SLOT("9904000002")}

    <section id="hypothesis" class="topic-section">
      <div class="section-header"><span class="sec-icon">🔬</span><h2>Hypothesis Testing</h2><span class="level-badge badge-uni">University</span></div>
      <div class="section-body">
        <div class="sub">
          <h3>Steps in Hypothesis Testing</h3>
          <ol class="sub">
            <li>State H₀ (null hypothesis) and H₁ (alternative hypothesis)</li>
            <li>Choose significance level α (typically 0.05)</li>
            <li>Calculate test statistic</li>
            <li>Find p-value or compare with critical value</li>
            <li>Reject H₀ if p &lt; α, otherwise fail to reject</li>
          </ol>
          <div class="formula-box">
            One-sample z-test: Z = (x̄ − μ₀) / (σ/√n)<br>
            One-sample t-test: T = (x̄ − μ₀) / (s/√n) &nbsp; ~t(n−1)<br>
            Chi-square test: χ² = Σ (O−E)²/E
          </div>
        </div>
      </div>
    </section>

    <section id="regression" class="topic-section">
      <div class="section-header"><span class="sec-icon">📐</span><h2>Regression & Correlation</h2><span class="level-badge badge-uni">University</span></div>
      <div class="section-body">
        <div class="sub">
          <div class="formula-box highlight">
            Pearson correlation: r = Σ(xᵢ−x̄)(yᵢ−ȳ) / [√Σ(xᵢ−x̄)² × √Σ(yᵢ−ȳ)²] &nbsp; (−1 ≤ r ≤ 1)<br>
            Simple linear regression: y = a + bx<br>
            b = Σ(xᵢ−x̄)(yᵢ−ȳ)/Σ(xᵢ−x̄)² &nbsp;&nbsp; a = ȳ − bx̄
          </div>
          <div class="callout tip"><span class="callout-icon">💡</span><span>r = ±1 perfect linear, r = 0 no linear correlation. Correlation ≠ causation!</span></div>
        </div>
      </div>
    </section>"""

topics.append({"filename":"statistics.html","title":"Statistics & Probability","icon":"📊","sub":"From data collection to statistical inference","levels":[("primary","Beginner"),("secondary","Secondary"),("uni","University")],"breadcrumb":"Statistics","toc":stats_toc,"content":stats_content,"prev_link":"conics.html","prev_label":"Conics","next_link":"differentiation.html","next_label":"Differentiation","id":"statistics"})

# ══════════════════════ 5. DIFFERENTIATION ══════════════════════
diff_toc = """
      <li class="toc-level">Introduction</li>
      <li><a href="#diff-intro">What is Differentiation?</a></li>
      <li class="toc-level">Secondary</li>
      <li><a href="#diff-rules">Basic Rules</a></li>
      <li><a href="#diff-trig">Trig & Exp Derivatives</a></li>
      <li><a href="#diff-chain">Chain, Product, Quotient</a></li>
      <li><a href="#diff-apps">Applications</a></li>
      <li class="toc-level">University</li>
      <li><a href="#implicit">Implicit & Parametric</a></li>
      <li><a href="#partial-diff">Partial Derivatives</a></li>
      <li><a href="#taylor">Taylor & Maclaurin Series</a></li>"""

diff_content = f"""
    <section id="diff-intro" class="topic-section">
      <div class="section-header"><span class="sec-icon">📈</span><h2>Introduction to Differentiation</h2><span class="level-badge badge-all">All Levels</span></div>
      <div class="section-body">
        <div class="sub"><h3>The Derivative — First Principles</h3>
          <div class="formula-box highlight">
            f′(x) = lim<sub>h→0</sub> [f(x+h) − f(x)] / h
          </div>
          <p>The derivative gives the instantaneous rate of change and the gradient of the tangent line at any point.</p>
          <div class="example-grid">
            <div class="example-card"><div class="example-label">Example — Differentiate f(x) = x² from first principles</div>
              <p class="soln">f′(x) = lim[(x+h)² − x²]/h = lim[2xh+h²]/h = lim(2x+h) = 2x</p></div>
          </div>
        </div>
        <div class="sub"><h3>Notation</h3>
          <div class="formula-box">dy/dx &nbsp; f′(x) &nbsp; Df(x) &nbsp; ẋ (dot notation in physics for time derivatives)</div>
        </div>
      </div>
    </section>

    {AD_SLOT("9905000001")}

    <section id="diff-rules" class="topic-section">
      <div class="section-header"><span class="sec-icon">📋</span><h2>Basic Differentiation Rules</h2><span class="level-badge badge-secondary">Secondary</span></div>
      <div class="section-body">
        <div class="sub">
          <div class="formula-box highlight">
            Power rule: d/dx(xⁿ) = nxⁿ⁻¹<br>
            Constant: d/dx(c) = 0<br>
            Sum/Difference: d/dx[f ± g] = f′ ± g′<br>
            Constant multiple: d/dx[cf] = cf′
          </div>
          <div class="example-grid">
            <div class="example-card"><div class="example-label">Example 1</div>
              <p>Differentiate y = 4x⁵ − 3x³ + 7x − 2</p>
              <p class="soln">dy/dx = 20x⁴ − 9x² + 7</p></div>
            <div class="example-card"><div class="example-label">Example 2</div>
              <p>Differentiate y = √x + 1/x²</p>
              <p class="soln">= x^(1/2) + x^(−2) → dy/dx = (1/2)x^(−1/2) − 2x^(−3) = 1/(2√x) − 2/x³</p></div>
          </div>
        </div>
      </div>
    </section>

    <section id="diff-trig" class="topic-section">
      <div class="section-header"><span class="sec-icon">sin</span><h2>Trig, Exponential & Log Derivatives</h2><span class="level-badge badge-secondary">Secondary / A-Level</span></div>
      <div class="section-body">
        <div class="sub">
          <div class="formula-box">
            d/dx(sin x) = cos x &nbsp;&nbsp; d/dx(cos x) = −sin x &nbsp;&nbsp; d/dx(tan x) = sec²x<br>
            d/dx(sec x) = sec x tan x &nbsp;&nbsp; d/dx(cosec x) = −cosec x cot x &nbsp;&nbsp; d/dx(cot x) = −cosec²x<br>
            d/dx(eˣ) = eˣ &nbsp;&nbsp; d/dx(aˣ) = aˣ ln a &nbsp;&nbsp; d/dx(ln x) = 1/x &nbsp;&nbsp; d/dx(log_a x) = 1/(x ln a)
          </div>
          <div class="example-grid">
            <div class="example-card"><div class="example-label">Example 1</div><p>d/dx(e^(3x)) = 3e^(3x)</p></div>
            <div class="example-card"><div class="example-label">Example 2</div><p>d/dx(ln(x²+1)) = 2x/(x²+1)</p></div>
            <div class="example-card"><div class="example-label">Example 3</div><p>d/dx(cos(x²)) = −2x sin(x²) [chain rule]</p></div>
          </div>
        </div>
      </div>
    </section>

    <section id="diff-chain" class="topic-section">
      <div class="section-header"><span class="sec-icon">🔗</span><h2>Product, Quotient & Chain Rules</h2><span class="level-badge badge-secondary">Secondary / A-Level</span></div>
      <div class="section-body">
        <div class="sub">
          <div class="formula-box highlight">
            Product rule: d/dx(uv) = u′v + uv′<br>
            Quotient rule: d/dx(u/v) = (u′v − uv′)/v²<br>
            Chain rule: d/dx[f(g(x))] = f′(g(x)) · g′(x)
          </div>
          <div class="example-grid">
            <div class="example-card"><div class="example-label">Example — Product rule</div>
              <p>Differentiate y = x² sin x</p>
              <p class="soln">dy/dx = 2x sin x + x² cos x</p></div>
            <div class="example-card"><div class="example-label">Example — Quotient rule</div>
              <p>Differentiate y = (x² + 1)/(x − 2)</p>
              <p class="soln">= [2x(x−2) − (x²+1)]/(x−2)² = (x²−4x−1)/(x−2)²</p></div>
            <div class="example-card"><div class="example-label">Example — Chain rule</div>
              <p>Differentiate y = (3x² + 5)⁷</p>
              <p class="soln">= 7(3x²+5)⁶ × 6x = 42x(3x²+5)⁶</p></div>
          </div>
        </div>
      </div>
    </section>

    <section id="diff-apps" class="topic-section">
      <div class="section-header"><span class="sec-icon">🎯</span><h2>Applications of Differentiation</h2><span class="level-badge badge-secondary">Secondary / A-Level</span></div>
      <div class="section-body">
        <div class="sub"><h3>Finding Stationary Points / Extrema</h3>
          <div class="formula-box">
            Set f′(x) = 0 to find stationary points.<br>
            f′′(x) &gt; 0 → local minimum &nbsp;&nbsp; f′′(x) &lt; 0 → local maximum &nbsp;&nbsp; f′′(x) = 0 → inflection (check sign change)
          </div>
          <div class="example-grid">
            <div class="example-card"><div class="example-label">Example</div>
              <p>Find and classify stationary points of f(x) = x³ − 3x + 2</p>
              <p class="soln">f′ = 3x²−3 = 0 → x = ±1. f′′=6x. At x=1: f′′=6 &gt; 0 → min. At x=−1: f′′=−6 &lt; 0 → max.</p></div>
          </div>
        </div>
        <div class="sub"><h3>Rates of Change & Optimisation</h3>
          <div class="example-grid">
            <div class="example-card"><div class="example-label">Example — Optimisation</div>
              <p>A box with square base and open top has volume 108 cm³. Minimise surface area.</p>
              <p class="soln">If base side = x, height = h. V = x²h = 108 → h = 108/x². SA = x² + 4xh = x² + 432/x. dSA/dx = 2x − 432/x² = 0 → x³ = 216 → x = 6, h = 3.</p></div>
          </div>
        </div>
        <div class="sub"><h3>L'Hôpital's Rule</h3>
          <div class="formula-box">If lim f(x)/g(x) is 0/0 or ∞/∞: &nbsp; lim f(x)/g(x) = lim f′(x)/g′(x)</div>
          <div class="example-grid">
            <div class="example-card"><div class="example-label">Example — lim(x→0) sin x / x</div>
              <p class="soln">= lim(x→0) cos x / 1 = 1</p></div>
          </div>
        </div>
      </div>
    </section>

    {AD_SLOT("9905000002")}

    <section id="implicit" class="topic-section">
      <div class="section-header"><span class="sec-icon">⚙️</span><h2>Implicit & Parametric Differentiation</h2><span class="level-badge badge-uni">University</span></div>
      <div class="section-body">
        <div class="sub">
          <h3>Implicit Differentiation</h3>
          <p>Differentiate both sides with respect to x, using d/dx[f(y)] = f′(y) · dy/dx.</p>
          <div class="example-grid">
            <div class="example-card"><div class="example-label">Example — Find dy/dx for x² + y² = 25</div>
              <p class="soln">2x + 2y(dy/dx) = 0 → dy/dx = −x/y</p></div>
            <div class="example-card"><div class="example-label">Example — Find dy/dx for xe^y = y</div>
              <p class="soln">e^y + xe^y(dy/dx) = dy/dx → e^y = dy/dx(1−xe^y) → dy/dx = e^y/(1−xe^y)</p></div>
          </div>
        </div>
        <div class="sub"><h3>Parametric Differentiation</h3>
          <div class="formula-box">dy/dx = (dy/dt)/(dx/dt) &nbsp;&nbsp; d²y/dx² = (d/dt[dy/dx])/(dx/dt)</div>
          <div class="example-grid">
            <div class="example-card"><div class="example-label">Example — x = t², y = t³</div>
              <p class="soln">dx/dt = 2t, dy/dt = 3t². dy/dx = 3t²/2t = 3t/2</p></div>
          </div>
        </div>
      </div>
    </section>

    <section id="partial-diff" class="topic-section">
      <div class="section-header"><span class="sec-icon">∂</span><h2>Partial Derivatives & Multivariable Calculus</h2><span class="level-badge badge-uni">University</span></div>
      <div class="section-body">
        <div class="sub">
          <div class="formula-box highlight">
            ∂f/∂x: differentiate with respect to x, treating y as constant<br>
            ∂f/∂y: differentiate with respect to y, treating x as constant<br>
            Gradient vector: ∇f = (∂f/∂x, ∂f/∂y, ∂f/∂z)
          </div>
          <div class="example-grid">
            <div class="example-card"><div class="example-label">Example — f(x,y) = x²y + 3xy²</div>
              <p class="soln">∂f/∂x = 2xy + 3y². ∂f/∂y = x² + 6xy</p></div>
          </div>
        </div>
        <div class="sub"><h3>Critical Points (Multivariable)</h3>
          <div class="formula-box">At critical point: ∂f/∂x = 0 and ∂f/∂y = 0. Use second derivative test (discriminant D = f_xx f_yy − (f_xy)²)</div>
        </div>
      </div>
    </section>

    <section id="taylor" class="topic-section">
      <div class="section-header"><span class="sec-icon">∑</span><h2>Taylor & Maclaurin Series</h2><span class="level-badge badge-uni">University</span></div>
      <div class="section-body">
        <div class="sub">
          <div class="formula-box highlight">
            Taylor: f(x) = f(a) + f′(a)(x−a) + f′′(a)(x−a)²/2! + f′′′(a)(x−a)³/3! + ...<br>
            Maclaurin (a=0): f(x) = f(0) + f′(0)x + f′′(0)x²/2! + ...<br><br>
            Common series: eˣ = 1 + x + x²/2! + ... &nbsp; sin x = x − x³/3! + x⁵/5! − ...<br>
            cos x = 1 − x²/2! + x⁴/4! − ... &nbsp;&nbsp; ln(1+x) = x − x²/2 + x³/3 − ... (|x|≤1)
          </div>
        </div>
      </div>
    </section>"""

topics.append({"filename":"differentiation.html","title":"Differentiation","icon":"📈","sub":"Rates of change from first principles to multivariable calculus","levels":[("primary","Secondary"),("secondary","A-Level"),("uni","University")],"breadcrumb":"Differentiation","toc":diff_toc,"content":diff_content,"prev_link":"statistics.html","prev_label":"Statistics","next_link":"integration.html","next_label":"Integration","id":"differentiation"})

# ══════════════════════ 6. INTEGRATION ══════════════════════
intg_toc = """
      <li class="toc-level">Introduction</li>
      <li><a href="#intg-intro">What is Integration?</a></li>
      <li class="toc-level">Secondary</li>
      <li><a href="#intg-basic">Basic Integrals</a></li>
      <li><a href="#intg-substitution">Substitution</a></li>
      <li><a href="#intg-by-parts">Integration by Parts</a></li>
      <li><a href="#intg-partial">Partial Fractions</a></li>
      <li><a href="#intg-apps">Applications</a></li>
      <li class="toc-level">University</li>
      <li><a href="#intg-improper">Improper Integrals</a></li>
      <li><a href="#intg-numerical">Numerical Integration</a></li>
      <li><a href="#intg-multiple">Multiple Integrals</a></li>"""

intg_content = f"""
    <section id="intg-intro" class="topic-section">
      <div class="section-header"><span class="sec-icon">∫</span><h2>Introduction to Integration</h2><span class="level-badge badge-all">All Levels</span></div>
      <div class="section-body">
        <div class="sub"><h3>Integration as the Reverse of Differentiation</h3>
          <p>Integration finds the antiderivative (indefinite integral) or the area under a curve (definite integral).</p>
          <div class="formula-box highlight">
            If F′(x) = f(x), then ∫f(x)dx = F(x) + C (indefinite integral)<br>
            ∫ₐᵇ f(x)dx = F(b) − F(a) (Fundamental Theorem of Calculus)
          </div>
        </div>
      </div>
    </section>

    {AD_SLOT("9906000001")}

    <section id="intg-basic" class="topic-section">
      <div class="section-header"><span class="sec-icon">📋</span><h2>Standard Integrals</h2><span class="level-badge badge-secondary">Secondary</span></div>
      <div class="section-body">
        <div class="sub">
          <div class="formula-box highlight">
            ∫xⁿ dx = xⁿ⁺¹/(n+1) + C &nbsp; (n ≠ −1) &nbsp;&nbsp; ∫x⁻¹ dx = ln|x| + C<br>
            ∫eˣ dx = eˣ + C &nbsp;&nbsp; ∫aˣ dx = aˣ/ln a + C<br>
            ∫sin x dx = −cos x + C &nbsp;&nbsp; ∫cos x dx = sin x + C<br>
            ∫sec²x dx = tan x + C &nbsp;&nbsp; ∫cosec²x dx = −cot x + C<br>
            ∫1/√(1−x²) dx = arcsin x + C &nbsp;&nbsp; ∫1/(1+x²) dx = arctan x + C
          </div>
          <div class="example-grid">
            <div class="example-card"><div class="example-label">Example 1</div>
              <p>∫(3x² − 2x + 5) dx</p>
              <p class="soln">= x³ − x² + 5x + C</p></div>
            <div class="example-card"><div class="example-label">Example 2 — Definite integral</div>
              <p>∫₁³ (x² + 1) dx</p>
              <p class="soln">= [x³/3 + x]₁³ = (9 + 3) − (1/3 + 1) = 12 − 4/3 = 32/3</p></div>
          </div>
        </div>
      </div>
    </section>

    <section id="intg-substitution" class="topic-section">
      <div class="section-header"><span class="sec-icon">🔄</span><h2>Integration by Substitution</h2><span class="level-badge badge-secondary">Secondary / A-Level</span></div>
      <div class="section-body">
        <div class="sub"><h3>Method: Let u = g(x), then du = g′(x) dx</h3>
          <div class="example-grid">
            <div class="example-card"><div class="example-label">Example 1</div>
              <p>∫ 2x(x²+1)⁵ dx</p>
              <p class="soln">Let u = x²+1, du = 2x dx. ∫u⁵ du = u⁶/6 + C = (x²+1)⁶/6 + C</p></div>
            <div class="example-card"><div class="example-label">Example 2</div>
              <p>∫ cos(3x+2) dx</p>
              <p class="soln">Let u = 3x+2, du = 3dx. (1/3)∫cos u du = (1/3)sin(3x+2) + C</p></div>
            <div class="example-card"><div class="example-label">Example 3 — Trig substitution</div>
              <p>∫ 1/√(4−x²) dx</p>
              <p class="soln">Let x = 2sinθ. ∫ (2cosθ)/(2cosθ) dθ = θ = arcsin(x/2) + C</p></div>
          </div>
        </div>
      </div>
    </section>

    <section id="intg-by-parts" class="topic-section">
      <div class="section-header"><span class="sec-icon">✂️</span><h2>Integration by Parts</h2><span class="level-badge badge-secondary">A-Level</span></div>
      <div class="section-body">
        <div class="sub">
          <div class="formula-box highlight">∫u dv = uv − ∫v du</div>
          <div class="callout tip"><span class="callout-icon">💡</span><span>LIATE rule for choosing u: Logarithm, Inverse trig, Algebraic, Trig, Exponential.</span></div>
          <div class="example-grid">
            <div class="example-card"><div class="example-label">Example 1</div>
              <p>∫ x eˣ dx</p>
              <p class="soln">u = x, dv = eˣdx → v = eˣ. = xeˣ − ∫eˣ dx = xeˣ − eˣ + C = (x−1)eˣ + C</p></div>
            <div class="example-card"><div class="example-label">Example 2</div>
              <p>∫ x² sin x dx</p>
              <p class="soln">Apply by parts twice: = −x²cos x + 2x sin x + 2cos x + C</p></div>
            <div class="example-card"><div class="example-label">Example 3</div>
              <p>∫ ln x dx</p>
              <p class="soln">u = ln x, dv = dx → = x ln x − x + C</p></div>
          </div>
        </div>
      </div>
    </section>

    <section id="intg-partial" class="topic-section">
      <div class="section-header"><span class="sec-icon">🧩</span><h2>Integration by Partial Fractions</h2><span class="level-badge badge-secondary">A-Level</span></div>
      <div class="section-body">
        <div class="sub">
          <div class="example-grid">
            <div class="example-card"><div class="example-label">Example — ∫ (3x+2)/[(x−1)(x+2)] dx</div>
              <p class="soln">Decompose: (3x+2)/[(x−1)(x+2)] = A/(x−1) + B/(x+2). A=5/3, B=4/3. ∫ = (5/3)ln|x−1| + (4/3)ln|x+2| + C</p></div>
            <div class="example-card"><div class="example-label">Example — Repeated factor ∫ 1/[x(x−1)²] dx</div>
              <p class="soln">= A/x + B/(x−1) + C/(x−1)². Solve: A=1, B=−1, C=1. ∫ = ln|x| − ln|x−1| − 1/(x−1) + C</p></div>
          </div>
        </div>
      </div>
    </section>

    <section id="intg-apps" class="topic-section">
      <div class="section-header"><span class="sec-icon">🎯</span><h2>Applications of Integration</h2><span class="level-badge badge-secondary">Secondary / A-Level</span></div>
      <div class="section-body">
        <div class="sub"><h3>Area Between Two Curves</h3>
          <div class="formula-box">A = ∫ₐᵇ [f(x) − g(x)] dx &nbsp; where f(x) ≥ g(x) on [a,b]</div>
          <div class="example-grid">
            <div class="example-card"><div class="example-label">Example — Area between y = x² and y = x</div>
              <p class="soln">Intersect at x=0,1. A = ∫₀¹(x − x²) dx = [x²/2 − x³/3]₀¹ = 1/2 − 1/3 = 1/6</p></div>
          </div>
        </div>
        <div class="sub"><h3>Volumes of Revolution</h3>
          <div class="formula-box">
            About x-axis: V = π∫ₐᵇ [f(x)]² dx &nbsp;&nbsp; (Disc method)<br>
            About y-axis: V = 2π∫ₐᵇ x·f(x) dx &nbsp; (Shell method)
          </div>
          <div class="example-grid">
            <div class="example-card"><div class="example-label">Example — Rotate y = √x from 0 to 4 about x-axis</div>
              <p class="soln">V = π∫₀⁴ x dx = π[x²/2]₀⁴ = 8π</p></div>
          </div>
        </div>
        <div class="sub"><h3>Arc Length & Surface Area</h3>
          <div class="formula-box">
            Arc length: L = ∫ₐᵇ √[1 + (dy/dx)²] dx<br>
            Surface of revolution: S = 2π∫ₐᵇ f(x)√[1 + (f′(x))²] dx
          </div>
        </div>
      </div>
    </section>

    {AD_SLOT("9906000002")}

    <section id="intg-improper" class="topic-section">
      <div class="section-header"><span class="sec-icon">♾️</span><h2>Improper Integrals</h2><span class="level-badge badge-uni">University</span></div>
      <div class="section-body">
        <div class="sub">
          <div class="formula-box">
            ∫ₐ^∞ f(x)dx = lim(t→∞) ∫ₐᵗ f(x)dx<br>
            ∫₋∞^∞ f(x)dx = ∫₋∞⁰ f(x)dx + ∫₀^∞ f(x)dx
          </div>
          <div class="example-grid">
            <div class="example-card"><div class="example-label">Example — ∫₁^∞ 1/x² dx</div>
              <p class="soln">= lim[−1/x]₁ᵗ = lim(−1/t + 1) = 1 (converges)</p></div>
            <div class="example-card"><div class="example-label">Example — ∫₁^∞ 1/x dx</div>
              <p class="soln">= lim[ln x]₁ᵗ = ∞ (diverges)</p></div>
          </div>
        </div>
      </div>
    </section>

    <section id="intg-numerical" class="topic-section">
      <div class="section-header"><span class="sec-icon">🖥️</span><h2>Numerical Integration</h2><span class="level-badge badge-uni">University</span></div>
      <div class="section-body">
        <div class="sub">
          <div class="formula-box">
            Trapezium rule: ∫ₐᵇ f(x)dx ≈ h/2 [f(x₀) + 2f(x₁) + ... + 2f(x_{{n−1}}) + f(xₙ)], h = (b−a)/n<br>
            Simpson's rule: ≈ h/3 [f(x₀) + 4f(x₁) + 2f(x₂) + 4f(x₃) + ... + f(xₙ)] (n even)
          </div>
        </div>
      </div>
    </section>

    <section id="intg-multiple" class="topic-section">
      <div class="section-header"><span class="sec-icon">∬</span><h2>Multiple Integrals</h2><span class="level-badge badge-uni">University</span></div>
      <div class="section-body">
        <div class="sub">
          <div class="formula-box highlight">
            Double integral: ∬_R f(x,y) dA = ∫∫ f(x,y) dy dx<br>
            Triple integral: ∭_V f(x,y,z) dV<br>
            Polar: ∬ f(r,θ) r dr dθ &nbsp;&nbsp; Jacobian: ∂(x,y)/∂(u,v) for change of variables
          </div>
          <div class="example-grid">
            <div class="example-card"><div class="example-label">Example — ∫₀¹∫₀¹ (x+y) dy dx</div>
              <p class="soln">Inner: ∫₀¹(x+y)dy = [xy + y²/2]₀¹ = x + 1/2. Outer: ∫₀¹(x+1/2)dx = [x²/2+x/2]₀¹ = 1.</p></div>
          </div>
        </div>
      </div>
    </section>"""

topics.append({"filename":"integration.html","title":"Integration","icon":"∫","sub":"From basic antiderivatives to multiple integrals","levels":[("primary","Secondary"),("secondary","A-Level"),("uni","University")],"breadcrumb":"Integration","toc":intg_toc,"content":intg_content,"prev_link":"differentiation.html","prev_label":"Differentiation","next_link":"vectors.html","next_label":"Vectors","id":"integration"})

# ═══ For brevity the remaining 7 topics follow the same pattern ═══
# VECTORS, MATRICES, AREAS, VOLUMES, LIMITS, COMPLEX NUMBERS, SEQUENCES & SERIES

def simple_topic(filename, title, icon, sub, breadcrumb, prev_link, prev_label, next_link, next_label, topic_id, toc_html, content_html, levels=None):
    if levels is None:
        levels = [("primary","Secondary"),("secondary","A-Level"),("uni","University")]
    topics.append({"filename":filename,"title":title,"icon":icon,"sub":sub,"levels":levels,"breadcrumb":breadcrumb,"toc":toc_html,"content":content_html,"prev_link":prev_link,"prev_label":prev_label,"next_link":next_link,"next_label":next_label,"id":topic_id})

# ══════════════════════ 7. VECTORS ══════════════════════
simple_topic(
  "vectors.html","Vectors","➡️","From basic direction to vector calculus","Vectors",
  "integration.html","Integration","matrices.html","Matrices","vectors",
  """
      <li class="toc-level">Secondary</li>
      <li><a href="#vec-basics">Vector Basics</a></li>
      <li><a href="#vec-ops">Operations</a></li>
      <li><a href="#vec-dot">Dot Product</a></li>
      <li><a href="#vec-cross">Cross Product</a></li>
      <li class="toc-level">University</li>
      <li><a href="#vec-lines-planes">Lines & Planes</a></li>
      <li><a href="#vec-calculus">Vector Calculus</a></li>""",
  f"""
    <section id="vec-basics" class="topic-section">
      <div class="section-header"><span class="sec-icon">➡️</span><h2>Vector Fundamentals</h2><span class="level-badge badge-secondary">Secondary</span></div>
      <div class="section-body">
        <div class="sub"><h3>Scalars vs Vectors</h3>
          <p>A <strong>scalar</strong> has magnitude only (mass, temperature). A <strong>vector</strong> has magnitude AND direction (force, velocity).</p>
          <div class="formula-box highlight">
            v = (x, y, z) = xi + yj + zk<br>
            Magnitude: |v| = √(x² + y² + z²)<br>
            Unit vector: v̂ = v/|v|
          </div>
          <div class="example-grid">
            <div class="example-card"><div class="example-label">Example 1</div>
              <p>Find magnitude and unit vector of v = (3, 4, 0)</p>
              <p class="soln">|v| = 5. v̂ = (3/5, 4/5, 0)</p></div>
            <div class="example-card"><div class="example-label">Example 2</div>
              <p>Find vector from A(1,2) to B(4,6)</p>
              <p class="soln">AB = B − A = (3, 4). |AB| = 5.</p></div>
          </div>
        </div>
      </div>
    </section>
    {AD_SLOT("9907000001")}
    <section id="vec-ops" class="topic-section">
      <div class="section-header"><span class="sec-icon">➕</span><h2>Vector Operations</h2><span class="level-badge badge-secondary">Secondary</span></div>
      <div class="section-body">
        <div class="sub">
          <div class="formula-box">
            Addition: (a₁,b₁) + (a₂,b₂) = (a₁+a₂, b₁+b₂)<br>
            Scalar multiplication: k(a,b) = (ka, kb)<br>
            Triangle law: AB + BC = AC &nbsp;&nbsp; Parallelogram law
          </div>
        </div>
      </div>
    </section>
    <section id="vec-dot" class="topic-section">
      <div class="section-header"><span class="sec-icon">·</span><h2>Dot (Scalar) Product</h2><span class="level-badge badge-secondary">Secondary / A-Level</span></div>
      <div class="section-body">
        <div class="sub">
          <div class="formula-box highlight">
            a·b = |a||b|cosθ = a₁b₁ + a₂b₂ + a₃b₃<br>
            Perpendicular vectors: a·b = 0<br>
            Projection of a onto b: (a·b)/|b|
          </div>
          <div class="example-grid">
            <div class="example-card"><div class="example-label">Example — Angle between vectors</div>
              <p>a = (1,2,2), b = (2,1,−2). Find angle.</p>
              <p class="soln">a·b = 2+2−4=0 → θ = 90°. Vectors are perpendicular!</p></div>
          </div>
        </div>
      </div>
    </section>
    <section id="vec-cross" class="topic-section">
      <div class="section-header"><span class="sec-icon">×</span><h2>Cross (Vector) Product</h2><span class="level-badge badge-secondary">A-Level</span></div>
      <div class="section-body">
        <div class="sub">
          <div class="formula-box highlight">
            a×b = |a||b|sinθ n̂ (perpendicular to both a and b)<br>
            a×b = |i  j  k |<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|a₁ a₂ a₃|<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|b₁ b₂ b₃|<br>
            = (a₂b₃−a₃b₂)i − (a₁b₃−a₃b₁)j + (a₁b₂−a₂b₁)k<br>
            |a×b| = area of parallelogram formed by a and b
          </div>
          <div class="example-grid">
            <div class="example-card"><div class="example-label">Example — a=(1,2,3), b=(4,5,6)</div>
              <p class="soln">a×b = (2×6−3×5, 3×4−1×6, 1×5−2×4) = (12−15, 12−6, 5−8) = (−3, 6, −3)</p></div>
          </div>
        </div>
      </div>
    </section>
    <section id="vec-lines-planes" class="topic-section">
      <div class="section-header"><span class="sec-icon">📐</span><h2>Lines & Planes in 3D</h2><span class="level-badge badge-uni">University</span></div>
      <div class="section-body">
        <div class="sub">
          <div class="formula-box">
            Line through a with direction d: r = a + td<br>
            Plane with normal n through point a: n·(r−a) = 0 → n₁x + n₂y + n₃z = d<br>
            Distance from point P to plane ax+by+cz=d: |aP_x+bP_y+cP_z−d|/√(a²+b²+c²)
          </div>
          <div class="example-grid">
            <div class="example-card"><div class="example-label">Example — Plane through 3 points</div>
              <p>A(1,0,0), B(0,2,0), C(0,0,3)</p>
              <p class="soln">AB = (−1,2,0), AC = (−1,0,3). n = AB×AC = (6,3,2). Equation: 6x+3y+2z=6.</p></div>
          </div>
        </div>
      </div>
    </section>
    <section id="vec-calculus" class="topic-section">
      <div class="section-header"><span class="sec-icon">∇</span><h2>Vector Calculus</h2><span class="level-badge badge-uni">University</span></div>
      <div class="section-body">
        <div class="sub">
          <div class="formula-box highlight">
            Gradient: ∇f = (∂f/∂x)i + (∂f/∂y)j + (∂f/∂z)k &nbsp; (points in direction of steepest ascent)<br>
            Divergence: ∇·F = ∂F₁/∂x + ∂F₂/∂y + ∂F₃/∂z &nbsp; (scalar)<br>
            Curl: ∇×F &nbsp; (measures rotation of vector field)<br>
            Laplacian: ∇²f = ∂²f/∂x² + ∂²f/∂y² + ∂²f/∂z²
          </div>
          <div class="callout note"><span class="callout-icon">📝</span><span>Stokes' theorem, Green's theorem, and the Divergence theorem connect line integrals, surface integrals, and volume integrals using these operators.</span></div>
        </div>
      </div>
    </section>"""
)

# ══════════════════════ 8. MATRICES ══════════════════════
simple_topic(
  "matrices.html","Matrices","⬜","From basic operations to eigenvalues and transformations","Matrices",
  "vectors.html","Vectors","areas.html","Areas of Shapes","matrices",
  """
      <li class="toc-level">Secondary</li>
      <li><a href="#mat-intro">Introduction</a></li>
      <li><a href="#mat-ops">Operations</a></li>
      <li><a href="#mat-det">Determinants</a></li>
      <li><a href="#mat-inverse">Inverse</a></li>
      <li><a href="#mat-systems">Solving Systems</a></li>
      <li class="toc-level">University</li>
      <li><a href="#mat-eigen">Eigenvalues</a></li>
      <li><a href="#mat-transforms">Transformations</a></li>""",
  f"""
    <section id="mat-intro" class="topic-section">
      <div class="section-header"><span class="sec-icon">⬜</span><h2>Introduction to Matrices</h2><span class="level-badge badge-secondary">Secondary</span></div>
      <div class="section-body">
        <div class="sub"><h3>What is a Matrix?</h3>
          <p>A matrix is a rectangular array of numbers arranged in rows and columns. An m×n matrix has m rows and n columns.</p>
          <h4>Special Matrices</h4>
          <table class="formula-table">
            <tr><th>Type</th><th>Description</th></tr>
            <tr><td>Square</td><td>Same number of rows and columns</td></tr>
            <tr><td>Identity (I)</td><td>Square, 1s on diagonal, 0s elsewhere. AI = IA = A</td></tr>
            <tr><td>Zero matrix</td><td>All entries are 0</td></tr>
            <tr><td>Diagonal</td><td>Non-diagonal entries are 0</td></tr>
            <tr><td>Symmetric</td><td>A = Aᵀ</td></tr>
            <tr><td>Orthogonal</td><td>AᵀA = I (rows/cols are orthonormal vectors)</td></tr>
          </table>
        </div>
      </div>
    </section>
    {AD_SLOT("9908000001")}
    <section id="mat-ops" class="topic-section">
      <div class="section-header"><span class="sec-icon">🔢</span><h2>Matrix Operations</h2><span class="level-badge badge-secondary">Secondary</span></div>
      <div class="section-body">
        <div class="sub">
          <div class="formula-box">
            Addition (same size): (A+B)ᵢⱼ = Aᵢⱼ + Bᵢⱼ<br>
            Scalar multiplication: (kA)ᵢⱼ = kAᵢⱼ<br>
            Multiplication: (AB)ᵢⱼ = Σₖ Aᵢₖ Bₖⱼ &nbsp; (A is m×n, B is n×p → AB is m×p)<br>
            NOTE: AB ≠ BA in general (not commutative)
          </div>
          <div class="example-grid">
            <div class="example-card"><div class="example-label">Example — 2×2 multiplication</div>
              <p>[[1,2],[3,4]] × [[5,6],[7,8]]</p>
              <p class="soln">= [[1×5+2×7, 1×6+2×8],[3×5+4×7, 3×6+4×8]] = [[19,22],[43,50]]</p></div>
          </div>
        </div>
        <div class="sub"><h3>Transpose</h3>
          <div class="formula-box">(Aᵀ)ᵢⱼ = Aⱼᵢ &nbsp; (rows become columns) &nbsp;&nbsp; (AB)ᵀ = BᵀAᵀ</div>
        </div>
      </div>
    </section>
    <section id="mat-det" class="topic-section">
      <div class="section-header"><span class="sec-icon">det</span><h2>Determinants</h2><span class="level-badge badge-secondary">Secondary / A-Level</span></div>
      <div class="section-body">
        <div class="sub">
          <div class="formula-box highlight">
            2×2: det(A) = ad − bc<br>
            3×3: expand along row 1: det = a(ei−fh) − b(di−fg) + c(dh−eg)<br>
            Properties: det(AB) = det(A)det(B) &nbsp;&nbsp; det(Aᵀ) = det(A) &nbsp;&nbsp; det(kA) = kⁿdet(A)
          </div>
          <div class="example-grid">
            <div class="example-card"><div class="example-label">Example — 3×3 determinant</div>
              <p>[[1,2,3],[4,5,6],[7,8,9]]</p>
              <p class="soln">= 1(45−48) − 2(36−42) + 3(32−35) = 1(−3) − 2(−6) + 3(−3) = −3+12−9 = 0</p></div>
          </div>
        </div>
      </div>
    </section>
    <section id="mat-inverse" class="topic-section">
      <div class="section-header"><span class="sec-icon">A⁻¹</span><h2>Matrix Inverse</h2><span class="level-badge badge-secondary">A-Level</span></div>
      <div class="section-body">
        <div class="sub">
          <div class="formula-box">
            A⁻¹ exists iff det(A) ≠ 0 (non-singular)<br>
            2×2 inverse: A⁻¹ = (1/det) [[d,−b],[−c,a]]<br>
            General: A⁻¹ = (1/det(A)) × adj(A)  where adj = transpose of cofactor matrix
          </div>
          <div class="example-grid">
            <div class="example-card"><div class="example-label">Example — Inverse of [[3,1],[5,2]]</div>
              <p class="soln">det = 3×2−1×5 = 1. A⁻¹ = [[2,−1],[−5,3]]</p></div>
          </div>
        </div>
      </div>
    </section>
    <section id="mat-systems" class="topic-section">
      <div class="section-header"><span class="sec-icon">📊</span><h2>Solving Linear Systems</h2><span class="level-badge badge-secondary">Secondary / A-Level</span></div>
      <div class="section-body">
        <div class="sub">
          <h3>Gaussian Elimination & Row Echelon Form</h3>
          <p>Augmented matrix [A|b]. Row operations: swap rows, multiply row by scalar, add multiple of one row to another.</p>
          <div class="formula-box">Cramer's Rule: xᵢ = det(Aᵢ)/det(A) where Aᵢ replaces column i with b</div>
          <div class="example-grid">
            <div class="example-card"><div class="example-label">Example — Solve by matrix inverse: 2x+y=5, 5x+3y=13</div>
              <p class="soln">A=[[2,1],[5,3]], det=1, A⁻¹=[[3,−1],[−5,2]]. [x;y] = A⁻¹[5;13] = [[3×5−13],[−25+26]] = [2;1]</p></div>
          </div>
        </div>
      </div>
    </section>
    <section id="mat-eigen" class="topic-section">
      <div class="section-header"><span class="sec-icon">λ</span><h2>Eigenvalues & Eigenvectors</h2><span class="level-badge badge-uni">University</span></div>
      <div class="section-body">
        <div class="sub">
          <div class="formula-box highlight">
            Av = λv &nbsp; (v ≠ 0) &nbsp;→&nbsp; (A − λI)v = 0 &nbsp;→&nbsp; det(A − λI) = 0 (characteristic equation)<br>
            Trace = sum of eigenvalues &nbsp;&nbsp; det(A) = product of eigenvalues
          </div>
          <div class="example-grid">
            <div class="example-card"><div class="example-label">Example — A = [[4,1],[2,3]]</div>
              <p class="soln">Char. eq: (4−λ)(3−λ)−2 = λ²−7λ+10=0 → λ=5 or λ=2. For λ=5: eigenvector (1,1). For λ=2: eigenvector (1,−2).</p></div>
          </div>
        </div>
        <div class="sub"><h3>Diagonalisation</h3>
          <div class="formula-box">A = PDP⁻¹ where D is diagonal matrix of eigenvalues, P has eigenvectors as columns. Aⁿ = PDⁿP⁻¹</div>
        </div>
      </div>
    </section>
    <section id="mat-transforms" class="topic-section">
      <div class="section-header"><span class="sec-icon">🔄</span><h2>Linear Transformations</h2><span class="level-badge badge-uni">University</span></div>
      <div class="section-body">
        <div class="sub">
          <h3>Common 2D Transformation Matrices</h3>
          <table class="formula-table">
            <tr><th>Transformation</th><th>Matrix</th></tr>
            <tr><td>Rotation by θ (anticlockwise)</td><td>[[cosθ,−sinθ],[sinθ,cosθ]]</td></tr>
            <tr><td>Reflection in x-axis</td><td>[[1,0],[0,−1]]</td></tr>
            <tr><td>Reflection in y-axis</td><td>[[−1,0],[0,1]]</td></tr>
            <tr><td>Scale by k</td><td>[[k,0],[0,k]]</td></tr>
            <tr><td>Shear (x-direction)</td><td>[[1,k],[0,1]]</td></tr>
          </table>
        </div>
      </div>
    </section>"""
)

# ══════════════════════ 9. AREAS OF SHAPES ══════════════════════
simple_topic(
  "areas.html","Areas of Shapes","📐","From simple rectangles to integration-based areas","Areas of Shapes",
  "matrices.html","Matrices","volumes.html","Volumes","areas",
  """
      <li class="toc-level">Beginner</li>
      <li><a href="#area-basic">Basic Shapes</a></li>
      <li class="toc-level">Secondary</li>
      <li><a href="#area-advanced">Advanced Shapes</a></li>
      <li><a href="#area-circle">Circles & Sectors</a></li>
      <li class="toc-level">University</li>
      <li><a href="#area-calculus">Calculus-Based Areas</a></li>""",
  f"""
    <section id="area-basic" class="topic-section">
      <div class="section-header"><span class="sec-icon">📐</span><h2>Basic Area Formulas</h2><span class="level-badge badge-primary">Beginner</span></div>
      <div class="section-body">
        <div class="sub">
          <table class="formula-table">
            <tr><th>Shape</th><th>Formula</th><th>Variables</th></tr>
            <tr><td>Rectangle</td><td>A = l × w</td><td>length, width</td></tr>
            <tr><td>Square</td><td>A = s²</td><td>side</td></tr>
            <tr><td>Triangle</td><td>A = ½bh</td><td>base, height</td></tr>
            <tr><td>Parallelogram</td><td>A = bh</td><td>base, perpendicular height</td></tr>
            <tr><td>Rhombus</td><td>A = ½d₁d₂</td><td>diagonals</td></tr>
            <tr><td>Trapezium</td><td>A = ½(a+b)h</td><td>parallel sides, height</td></tr>
          </table>
          <div class="example-grid">
            <div class="example-card"><div class="example-label">Example 1</div>
              <p>Rectangle: l = 8 cm, w = 5 cm. Find area.</p>
              <p class="soln">A = 8 × 5 = 40 cm²</p></div>
            <div class="example-card"><div class="example-label">Example 2</div>
              <p>Trapezium: parallel sides 6 cm and 10 cm, height 4 cm.</p>
              <p class="soln">A = ½(6+10)×4 = ½×16×4 = 32 cm²</p></div>
            <div class="example-card"><div class="example-label">Example 3 — Word problem</div>
              <p>A triangular garden has base 12 m and height 7 m. Find area.</p>
              <p class="soln">A = ½ × 12 × 7 = 42 m²</p></div>
          </div>
        </div>
      </div>
    </section>
    {AD_SLOT("9909000001")}
    <section id="area-advanced" class="topic-section">
      <div class="section-header"><span class="sec-icon">🔷</span><h2>Areas of Advanced Shapes</h2><span class="level-badge badge-secondary">Secondary</span></div>
      <div class="section-body">
        <div class="sub">
          <table class="formula-table">
            <tr><th>Shape</th><th>Formula</th></tr>
            <tr><td>Regular polygon (n sides, side length s)</td><td>A = (ns²)/(4 tan(π/n))</td></tr>
            <tr><td>Any polygon</td><td>Shoelace formula: A = ½|Σ(xᵢyᵢ₊₁ − xᵢ₊₁yᵢ)|</td></tr>
            <tr><td>Ellipse</td><td>A = πab (semi-axes a, b)</td></tr>
          </table>
          <div class="example-grid">
            <div class="example-card"><div class="example-label">Example — Regular hexagon, side 5 cm</div>
              <p class="soln">A = (6×25)/(4tan(π/6)) = 150/(4×(1/√3)) = 150√3/4 ≈ 64.95 cm²</p></div>
          </div>
        </div>
      </div>
    </section>
    <section id="area-circle" class="topic-section">
      <div class="section-header"><span class="sec-icon">⭕</span><h2>Circles, Sectors & Segments</h2><span class="level-badge badge-secondary">Secondary</span></div>
      <div class="section-body">
        <div class="sub">
          <div class="formula-box highlight">
            Circle: A = πr² &nbsp;&nbsp; Circumference: C = 2πr<br>
            Sector (angle θ radians): A = ½r²θ &nbsp;&nbsp; Arc length: l = rθ<br>
            Segment: A_segment = A_sector − A_triangle = ½r²θ − ½r²sinθ = ½r²(θ − sinθ)
          </div>
          <div class="example-grid">
            <div class="example-card"><div class="example-label">Example — Sector: r=6, θ=2 rad</div>
              <p class="soln">A = ½×36×2 = 36 cm². Arc = 6×2 = 12 cm.</p></div>
            <div class="example-card"><div class="example-label">Example — Segment: r=10, θ=π/3</div>
              <p class="soln">A = ½×100×(π/3 − sin(π/3)) = 50(π/3 − √3/2) ≈ 52.36 − 43.30 ≈ 9.06 cm²</p></div>
          </div>
        </div>
        <div class="sub"><h3>Surface Areas of 3D Shapes</h3>
          <table class="formula-table">
            <tr><th>Shape</th><th>Surface Area</th></tr>
            <tr><td>Cube (side a)</td><td>6a²</td></tr>
            <tr><td>Cuboid</td><td>2(lw + lh + wh)</td></tr>
            <tr><td>Cylinder (r, h)</td><td>2πr(r + h)</td></tr>
            <tr><td>Cone (r, l = slant)</td><td>πr(r + l)</td></tr>
            <tr><td>Sphere</td><td>4πr²</td></tr>
          </table>
        </div>
      </div>
    </section>
    <section id="area-calculus" class="topic-section">
      <div class="section-header"><span class="sec-icon">∫</span><h2>Areas Using Calculus</h2><span class="level-badge badge-uni">University</span></div>
      <div class="section-body">
        <div class="sub">
          <div class="formula-box">
            Area under curve (above x-axis): A = ∫ₐᵇ f(x) dx<br>
            Area between two curves: A = ∫ₐᵇ |f(x) − g(x)| dx<br>
            Polar area: A = ½∫ r(θ)² dθ
          </div>
          <div class="example-grid">
            <div class="example-card"><div class="example-label">Example — Area of ellipse using integration</div>
              <p>Ellipse x²/a² + y²/b² = 1</p>
              <p class="soln">A = 4∫₀ᵃ (b/a)√(a²−x²) dx = 4(b/a)(πa²/4) = πab ✓</p></div>
          </div>
        </div>
      </div>
    </section>"""
)

# ══════════════════════ 10. VOLUMES ══════════════════════
simple_topic(
  "volumes.html","Volumes of Solids","📦","From simple prisms to volumes of revolution","Volumes of Solids",
  "areas.html","Areas","limits.html","Limits","volumes",
  """
      <li class="toc-level">Beginner</li>
      <li><a href="#vol-basic">Basic Formulas</a></li>
      <li class="toc-level">Secondary</li>
      <li><a href="#vol-composite">Composite Shapes</a></li>
      <li><a href="#vol-similar">Similar Solids</a></li>
      <li class="toc-level">University</li>
      <li><a href="#vol-calculus">Volumes by Calculus</a></li>""",
  f"""
    <section id="vol-basic" class="topic-section">
      <div class="section-header"><span class="sec-icon">📦</span><h2>Volume Formulas</h2><span class="level-badge badge-primary">Beginner</span></div>
      <div class="section-body">
        <div class="sub">
          <table class="formula-table">
            <tr><th>Solid</th><th>Formula</th></tr>
            <tr><td>Cube (side a)</td><td>V = a³</td></tr>
            <tr><td>Cuboid</td><td>V = l × w × h</td></tr>
            <tr><td>Cylinder (r, h)</td><td>V = πr²h</td></tr>
            <tr><td>Sphere (r)</td><td>V = (4/3)πr³</td></tr>
            <tr><td>Cone (r, h)</td><td>V = (1/3)πr²h</td></tr>
            <tr><td>Pyramid (base A, height h)</td><td>V = (1/3)Ah</td></tr>
            <tr><td>Prism</td><td>V = base area × height</td></tr>
          </table>
          <div class="example-grid">
            <div class="example-card"><div class="example-label">Example 1</div>
              <p>Cylinder: r = 5 cm, h = 12 cm</p>
              <p class="soln">V = π × 25 × 12 = 300π ≈ 942.5 cm³</p></div>
            <div class="example-card"><div class="example-label">Example 2</div>
              <p>Sphere: r = 3 cm. Find volume.</p>
              <p class="soln">V = (4/3)π×27 = 36π ≈ 113.1 cm³</p></div>
            <div class="example-card"><div class="example-label">Example 3 — Word problem</div>
              <p>A conical tent has base radius 7 m and height 9 m. Find volume.</p>
              <p class="soln">V = (1/3)π(49)(9) = 147π ≈ 461.8 m³</p></div>
          </div>
        </div>
      </div>
    </section>
    {AD_SLOT("9910000001")}
    <section id="vol-composite" class="topic-section">
      <div class="section-header"><span class="sec-icon">🔲</span><h2>Composite Solids</h2><span class="level-badge badge-secondary">Secondary</span></div>
      <div class="section-body">
        <div class="sub">
          <p>For composite solids, add or subtract volumes of individual components.</p>
          <div class="example-grid">
            <div class="example-card"><div class="example-label">Example — Cylinder with hemispherical ends</div>
              <p>Cylinder r=4, h=10; each end is a hemisphere.</p>
              <p class="soln">V = πr²h + 2×(2/3)πr³ = π×16×10 + (4/3)π×64 = 160π + 256π/3 = (480+256)π/3 = 736π/3 ≈ 770.5 cm³</p></div>
          </div>
        </div>
      </div>
    </section>
    <section id="vol-similar" class="topic-section">
      <div class="section-header"><span class="sec-icon">🔄</span><h2>Similar Solids</h2><span class="level-badge badge-secondary">Secondary</span></div>
      <div class="section-body">
        <div class="sub">
          <div class="formula-box highlight">
            If linear scale factor = k:<br>
            Area scale factor = k² &nbsp;&nbsp; Volume scale factor = k³
          </div>
          <div class="example-grid">
            <div class="example-card"><div class="example-label">Example</div>
              <p>Two similar cones have radii 3 cm and 6 cm. If smaller has volume 24 cm³, find larger.</p>
              <p class="soln">k = 6/3 = 2. V = 24 × 2³ = 24 × 8 = 192 cm³</p></div>
          </div>
        </div>
      </div>
    </section>
    <section id="vol-calculus" class="topic-section">
      <div class="section-header"><span class="sec-icon">∫∫∫</span><h2>Volumes by Calculus</h2><span class="level-badge badge-uni">University</span></div>
      <div class="section-body">
        <div class="sub">
          <div class="formula-box">
            Disc method: V = π∫ₐᵇ [f(x)]² dx &nbsp;&nbsp; (rotation about x-axis)<br>
            Washer method: V = π∫ₐᵇ ([f(x)]² − [g(x)]²) dx<br>
            Shell method: V = 2π∫ₐᵇ x·f(x) dx &nbsp;&nbsp; (rotation about y-axis)
          </div>
          <div class="example-grid">
            <div class="example-card"><div class="example-label">Example — Derive sphere volume V = (4/3)πr³</div>
              <p>Rotate y = √(r²−x²) about x-axis from −r to r.</p>
              <p class="soln">V = π∫₋ᵣʳ (r²−x²)dx = π[r²x − x³/3]₋ᵣʳ = π(2r³ − 2r³/3) = (4/3)πr³ ✓</p></div>
          </div>
        </div>
      </div>
    </section>"""
)

# ══════════════════════ 11. LIMITS ══════════════════════
simple_topic(
  "limits.html","Limits & Continuity","🎯","From intuitive limits to epsilon-delta proofs","Limits & Continuity",
  "volumes.html","Volumes","complex.html","Complex Numbers","limits",
  """
      <li class="toc-level">Secondary</li>
      <li><a href="#lim-intro">Introduction to Limits</a></li>
      <li><a href="#lim-laws">Limit Laws</a></li>
      <li><a href="#lim-special">Special Limits</a></li>
      <li><a href="#lim-continuity">Continuity</a></li>
      <li class="toc-level">University</li>
      <li><a href="#lim-epsilon">Epsilon-Delta</a></li>
      <li><a href="#lim-sequences">Limits of Sequences</a></li>""",
  f"""
    <section id="lim-intro" class="topic-section">
      <div class="section-header"><span class="sec-icon">🎯</span><h2>Introduction to Limits</h2><span class="level-badge badge-secondary">Secondary</span></div>
      <div class="section-body">
        <div class="sub">
          <p>lim_{{x→a}} f(x) = L means: as x gets arbitrarily close to a (but NOT equal to a), f(x) approaches L.</p>
          <div class="formula-box highlight">
            One-sided limits:<br>
            lim_{{x→a⁻}} f(x) — left-hand limit (approach from below)<br>
            lim_{{x→a⁺}} f(x) — right-hand limit (approach from above)<br>
            Limit exists iff: lim_{{x→a⁻}} f(x) = lim_{{x→a⁺}} f(x) = L
          </div>
          <div class="example-grid">
            <div class="example-card"><div class="example-label">Example 1 — Direct substitution</div>
              <p>lim_{{x→3}} (x² + 2x − 1)</p>
              <p class="soln">= 9 + 6 − 1 = 14</p></div>
            <div class="example-card"><div class="example-label">Example 2 — Indeterminate form 0/0</div>
              <p>lim_{{x→2}} (x²−4)/(x−2)</p>
              <p class="soln">Factor: (x−2)(x+2)/(x−2) = x+2. Limit = 4.</p></div>
            <div class="example-card"><div class="example-label">Example 3 — Infinity</div>
              <p>lim_{{x→∞}} (3x²+2)/(x²−1)</p>
              <p class="soln">Divide by x²: (3+2/x²)/(1−1/x²) → 3/1 = 3</p></div>
          </div>
        </div>
      </div>
    </section>
    {AD_SLOT("9911000001")}
    <section id="lim-laws" class="topic-section">
      <div class="section-header"><span class="sec-icon">📋</span><h2>Limit Laws</h2><span class="level-badge badge-secondary">Secondary</span></div>
      <div class="section-body">
        <div class="sub">
          <div class="formula-box">
            Sum/Difference: lim[f ± g] = lim f ± lim g<br>
            Product: lim[fg] = (lim f)(lim g)<br>
            Quotient: lim[f/g] = lim f / lim g (if lim g ≠ 0)<br>
            Power: lim[f(x)]ⁿ = [lim f(x)]ⁿ<br>
            Squeeze theorem: g(x) ≤ f(x) ≤ h(x) and lim g = lim h = L → lim f = L
          </div>
        </div>
      </div>
    </section>
    <section id="lim-special" class="topic-section">
      <div class="section-header"><span class="sec-icon">⭐</span><h2>Special Limits</h2><span class="level-badge badge-secondary">A-Level</span></div>
      <div class="section-body">
        <div class="sub">
          <div class="formula-box highlight">
            lim_{{x→0}} sin x / x = 1 &nbsp;&nbsp; lim_{{x→0}} (1−cos x)/x = 0<br>
            lim_{{x→0}} (eˣ−1)/x = 1 &nbsp;&nbsp; lim_{{x→0}} ln(1+x)/x = 1<br>
            lim_{{x→∞}} (1 + 1/x)ˣ = e &nbsp;&nbsp; lim_{{x→0}} (1+x)^(1/x) = e
          </div>
          <div class="example-grid">
            <div class="example-card"><div class="example-label">Example — lim sin(3x)/x as x→0</div>
              <p class="soln">= 3 × lim sin(3x)/(3x) = 3 × 1 = 3</p></div>
          </div>
        </div>
        <div class="sub"><h3>L'Hôpital's Rule</h3>
          <div class="formula-box">For 0/0 or ∞/∞ forms: lim f(x)/g(x) = lim f′(x)/g′(x)</div>
          <div class="example-grid">
            <div class="example-card"><div class="example-label">Example — lim (x−sinx)/x³ as x→0</div>
              <p class="soln">Apply L'Hôpital 3 times: → (1−cosx)/3x² → sinx/6x → cosx/6 = 1/6</p></div>
          </div>
        </div>
      </div>
    </section>
    <section id="lim-continuity" class="topic-section">
      <div class="section-header"><span class="sec-icon">〰️</span><h2>Continuity</h2><span class="level-badge badge-secondary">A-Level</span></div>
      <div class="section-body">
        <div class="sub">
          <h3>f is continuous at x = a iff:</h3>
          <ol class="sub"><li>f(a) is defined</li><li>lim_{{x→a}} f(x) exists</li><li>lim_{{x→a}} f(x) = f(a)</li></ol>
          <h3>Types of Discontinuity</h3>
          <table class="formula-table">
            <tr><th>Type</th><th>Description</th><th>Example</th></tr>
            <tr><td>Removable</td><td>Hole; limit exists but f(a) ≠ limit</td><td>f(x) = (x²−1)/(x−1)</td></tr>
            <tr><td>Jump</td><td>Left and right limits exist but differ</td><td>Floor function</td></tr>
            <tr><td>Infinite</td><td>Vertical asymptote</td><td>f(x) = 1/x at 0</td></tr>
            <tr><td>Oscillatory</td><td>Function oscillates infinitely</td><td>sin(1/x) at 0</td></tr>
          </table>
          <div class="callout tip"><span class="callout-icon">💡</span><span><strong>Intermediate Value Theorem:</strong> If f is continuous on [a,b] and f(a) &lt; k &lt; f(b), then ∃ c ∈ (a,b) with f(c) = k.</span></div>
        </div>
      </div>
    </section>
    <section id="lim-epsilon" class="topic-section">
      <div class="section-header"><span class="sec-icon">ε</span><h2>Epsilon-Delta Definition</h2><span class="level-badge badge-uni">University</span></div>
      <div class="section-body">
        <div class="sub">
          <div class="formula-box highlight">
            lim_{{x→a}} f(x) = L means: ∀ε &gt; 0, ∃δ &gt; 0 such that 0 &lt; |x−a| &lt; δ implies |f(x)−L| &lt; ε
          </div>
          <p>This is the rigorous mathematical foundation of limits. Given any tolerance ε around L, we can find a δ-neighbourhood around a that maps inside the ε-band.</p>
          <div class="example-grid">
            <div class="example-card"><div class="example-label">Example — Prove lim_{{x→2}} (3x−1) = 5</div>
              <p class="soln">Need |3x−1−5| &lt; ε. |3x−6| = 3|x−2| &lt; ε. Choose δ = ε/3. Then |x−2| &lt; δ → |f(x)−5| = 3|x−2| &lt; 3(ε/3) = ε ✓</p></div>
          </div>
        </div>
      </div>
    </section>
    <section id="lim-sequences" class="topic-section">
      <div class="section-header"><span class="sec-icon">∞</span><h2>Limits of Sequences & Series</h2><span class="level-badge badge-uni">University</span></div>
      <div class="section-body">
        <div class="sub">
          <div class="formula-box">
            Sequence limit: lim_{{n→∞}} aₙ = L (convergent) or does not exist (divergent)<br>
            Cauchy sequences: fundamental criterion without explicit limit<br>
            Series convergence tests: ratio test, root test, integral test, comparison test
          </div>
        </div>
      </div>
    </section>"""
)

# ══════════════════════ 12. COMPLEX NUMBERS ══════════════════════
simple_topic(
  "complex.html","Complex Numbers","🌀","From imaginary unit to complex analysis","Complex Numbers",
  "limits.html","Limits","sequences.html","Sequences & Series","complex",
  """
      <li class="toc-level">Secondary</li>
      <li><a href="#cplx-basics">Basics</a></li>
      <li><a href="#cplx-ops">Operations</a></li>
      <li><a href="#cplx-polar">Polar Form</a></li>
      <li><a href="#cplx-demoivre">De Moivre's Theorem</a></li>
      <li class="toc-level">University</li>
      <li><a href="#cplx-roots">Roots & Powers</a></li>
      <li><a href="#cplx-analysis">Complex Analysis</a></li>""",
  f"""
    <section id="cplx-basics" class="topic-section">
      <div class="section-header"><span class="sec-icon">🌀</span><h2>Introduction to Complex Numbers</h2><span class="level-badge badge-secondary">Secondary</span></div>
      <div class="section-body">
        <div class="sub">
          <p>Complex numbers were invented to solve equations like x² + 1 = 0. They extend the real numbers.</p>
          <div class="formula-box highlight">
            i = √(−1) &nbsp;&nbsp; i² = −1 &nbsp;&nbsp; i³ = −i &nbsp;&nbsp; i⁴ = 1<br>
            z = a + bi &nbsp; where a = Re(z), b = Im(z)<br>
            Conjugate: z̄ = a − bi &nbsp;&nbsp; Modulus: |z| = √(a²+b²)
          </div>
          <div class="example-grid">
            <div class="example-card"><div class="example-label">Example 1</div>
              <p>z = 3 + 4i. Find |z| and z̄.</p>
              <p class="soln">|z| = √(9+16) = 5. z̄ = 3 − 4i.</p></div>
            <div class="example-card"><div class="example-label">Example 2 — Solve x² + 4 = 0</div>
              <p class="soln">x² = −4 → x = ±2i</p></div>
          </div>
        </div>
      </div>
    </section>
    {AD_SLOT("9912000001")}
    <section id="cplx-ops" class="topic-section">
      <div class="section-header"><span class="sec-icon">➕</span><h2>Operations with Complex Numbers</h2><span class="level-badge badge-secondary">Secondary</span></div>
      <div class="section-body">
        <div class="sub">
          <div class="formula-box">
            Add: (a+bi) + (c+di) = (a+c) + (b+d)i<br>
            Multiply: (a+bi)(c+di) = (ac−bd) + (ad+bc)i &nbsp; (use i²=−1)<br>
            Divide: (a+bi)/(c+di) = [(a+bi)(c−di)] / (c²+d²)
          </div>
          <div class="example-grid">
            <div class="example-card"><div class="example-label">Example — Multiply (2+3i)(1−2i)</div>
              <p class="soln">= 2−4i+3i−6i² = 2−i+6 = 8−i</p></div>
            <div class="example-card"><div class="example-label">Example — Divide (3+4i)/(1+2i)</div>
              <p class="soln">Multiply by (1−2i): (3+4i)(1−2i)/5 = (3−6i+4i−8i²)/5 = (11−2i)/5 = 2.2 − 0.4i</p></div>
          </div>
        </div>
        <div class="sub"><h3>Argand Diagram</h3>
          <p>Complex numbers are plotted on the Argand plane: real axis (horizontal) and imaginary axis (vertical). The modulus |z| is the distance from origin.</p>
        </div>
      </div>
    </section>
    <section id="cplx-polar" class="topic-section">
      <div class="section-header"><span class="sec-icon">🧭</span><h2>Polar & Exponential Form</h2><span class="level-badge badge-secondary">A-Level</span></div>
      <div class="section-body">
        <div class="sub">
          <div class="formula-box highlight">
            Polar: z = r(cos θ + i sin θ) = r cis θ<br>
            r = |z| = √(a²+b²) &nbsp;&nbsp; θ = arg(z) = arctan(b/a) (with correct quadrant)<br>
            Euler's formula: e^(iθ) = cos θ + i sin θ<br>
            Exponential: z = re^(iθ)<br>
            Multiplication: r₁e^(iθ₁) × r₂e^(iθ₂) = r₁r₂ e^(i(θ₁+θ₂))
          </div>
          <div class="example-grid">
            <div class="example-card"><div class="example-label">Example — Convert 1+i to polar</div>
              <p class="soln">r = √2, θ = π/4. z = √2 e^(iπ/4) = √2(cos45°+i sin45°)</p></div>
            <div class="example-card"><div class="example-label">Example — Euler's identity</div>
              <p>Show e^(iπ) + 1 = 0</p>
              <p class="soln">e^(iπ) = cos π + i sin π = −1 + 0 = −1. So e^(iπ) + 1 = 0. ✓</p></div>
          </div>
        </div>
      </div>
    </section>
    <section id="cplx-demoivre" class="topic-section">
      <div class="section-header"><span class="sec-icon">🔮</span><h2>De Moivre's Theorem</h2><span class="level-badge badge-secondary">A-Level</span></div>
      <div class="section-body">
        <div class="sub">
          <div class="formula-box highlight">(cos θ + i sin θ)ⁿ = cos(nθ) + i sin(nθ)</div>
          <div class="example-grid">
            <div class="example-card"><div class="example-label">Example — (1+i)⁸</div>
              <p class="soln">1+i = √2 e^(iπ/4). (1+i)⁸ = (√2)⁸ e^(i2π) = 16 × 1 = 16</p></div>
            <div class="example-card"><div class="example-label">Example — Express cos3θ in terms of cosθ</div>
              <p class="soln">cos3θ + i sin3θ = (cosθ+i sinθ)³ = cos³θ + 3cos²θ(i sinθ) + 3cosθ(i sinθ)² + (i sinθ)³. Real part: cos3θ = 4cos³θ − 3cosθ</p></div>
          </div>
        </div>
      </div>
    </section>
    <section id="cplx-roots" class="topic-section">
      <div class="section-header"><span class="sec-icon">🌱</span><h2>nth Roots of Complex Numbers</h2><span class="level-badge badge-uni">University</span></div>
      <div class="section-body">
        <div class="sub">
          <div class="formula-box">
            nth roots of re^(iθ): &nbsp; z_k = r^(1/n) e^(i(θ+2πk)/n) &nbsp; for k = 0, 1, ..., n−1<br>
            The n roots are equally spaced on a circle of radius r^(1/n)
          </div>
          <div class="example-grid">
            <div class="example-card"><div class="example-label">Example — Cube roots of unity (z³=1)</div>
              <p class="soln">r=1, θ=0. z_k = e^(2πki/3), k=0,1,2. → 1, e^(2πi/3)=(−½+i√3/2), e^(4πi/3)=(−½−i√3/2)</p></div>
          </div>
        </div>
      </div>
    </section>
    <section id="cplx-analysis" class="topic-section">
      <div class="section-header"><span class="sec-icon">🔬</span><h2>Introduction to Complex Analysis</h2><span class="level-badge badge-uni">University</span></div>
      <div class="section-body">
        <div class="sub">
          <h3>Analytic Functions — Cauchy-Riemann Equations</h3>
          <div class="formula-box highlight">
            f(z) = u(x,y) + iv(x,y) is analytic iff:<br>
            ∂u/∂x = ∂v/∂y &nbsp;&nbsp;&nbsp; ∂u/∂y = −∂v/∂x
          </div>
        </div>
        <div class="sub"><h3>Cauchy's Integral Theorem & Formula</h3>
          <div class="formula-box">
            Cauchy: ∮_C f(z) dz = 0 for analytic f inside C<br>
            Cauchy's formula: f(z₀) = (1/2πi) ∮_C f(z)/(z−z₀) dz<br>
            Residue theorem: ∮_C f(z) dz = 2πi Σ Res(f, z_k)
          </div>
        </div>
      </div>
    </section>"""
)

# ══════════════════════ 13. SEQUENCES & SERIES ══════════════════════
simple_topic(
  "sequences.html","Sequences & Series","∑","From arithmetic sequences to power series","Sequences & Series",
  "complex.html","Complex Numbers","../math-lessons.html","All Topics","sequences",
  """
      <li class="toc-level">Beginner</li>
      <li><a href="#seq-intro">Sequences</a></li>
      <li class="toc-level">Secondary</li>
      <li><a href="#seq-arithmetic">Arithmetic Series</a></li>
      <li><a href="#seq-geometric">Geometric Series</a></li>
      <li><a href="#seq-special">Special Series</a></li>
      <li class="toc-level">University</li>
      <li><a href="#seq-convergence">Convergence Tests</a></li>
      <li><a href="#seq-power">Power Series</a></li>""",
  f"""
    <section id="seq-intro" class="topic-section">
      <div class="section-header"><span class="sec-icon">📋</span><h2>Sequences</h2><span class="level-badge badge-primary">Beginner</span></div>
      <div class="section-body">
        <div class="sub">
          <p>A sequence is an ordered list of numbers following a pattern. We denote the nth term as aₙ.</p>
          <h3>Types of Sequences</h3>
          <table class="formula-table">
            <tr><th>Type</th><th>Rule</th><th>Example</th></tr>
            <tr><td>Arithmetic</td><td>aₙ = a + (n−1)d</td><td>2, 5, 8, 11, ... (d=3)</td></tr>
            <tr><td>Geometric</td><td>aₙ = arⁿ⁻¹</td><td>3, 6, 12, 24, ... (r=2)</td></tr>
            <tr><td>Fibonacci</td><td>aₙ = aₙ₋₁ + aₙ₋₂</td><td>1,1,2,3,5,8,13,...</td></tr>
            <tr><td>Quadratic</td><td>aₙ = an² + bn + c</td><td>1,4,9,16,25,... (perfect squares)</td></tr>
          </table>
          <div class="example-grid">
            <div class="example-card"><div class="example-label">Example — Find 15th term of 7, 11, 15, 19, ...</div>
              <p class="soln">a=7, d=4. a₁₅ = 7 + 14×4 = 7 + 56 = 63</p></div>
            <div class="example-card"><div class="example-label">Example — Find 10th term of 3, 6, 12, 24, ...</div>
              <p class="soln">a=3, r=2. a₁₀ = 3 × 2⁹ = 3 × 512 = 1536</p></div>
          </div>
        </div>
      </div>
    </section>
    {AD_SLOT("9913000001")}
    <section id="seq-arithmetic" class="topic-section">
      <div class="section-header"><span class="sec-icon">➕</span><h2>Arithmetic Series</h2><span class="level-badge badge-secondary">Secondary</span></div>
      <div class="section-body">
        <div class="sub">
          <div class="formula-box highlight">
            nth term: aₙ = a + (n−1)d<br>
            Sum of n terms: Sₙ = n/2 × (2a + (n−1)d) = n/2 × (first + last)
          </div>
          <div class="example-grid">
            <div class="example-card"><div class="example-label">Example 1 — Sum 1+2+3+...+100</div>
              <p class="soln">a=1, d=1, n=100. S = 100/2(2+99) = 50×101 = 5050</p></div>
            <div class="example-card"><div class="example-label">Example 2 — How many terms for sum = 1225?</div>
              <p>Sequence: 7, 9, 11, ...</p>
              <p class="soln">a=7, d=2. n/2(14+2(n−1)) = 1225 → n² + 6n − 1225 = 0 → n = 35 (taking positive root)</p></div>
          </div>
        </div>
      </div>
    </section>
    <section id="seq-geometric" class="topic-section">
      <div class="section-header"><span class="sec-icon">✖️</span><h2>Geometric Series</h2><span class="level-badge badge-secondary">Secondary</span></div>
      <div class="section-body">
        <div class="sub">
          <div class="formula-box highlight">
            nth term: aₙ = arⁿ⁻¹<br>
            Sum n terms: Sₙ = a(rⁿ−1)/(r−1) for r ≠ 1<br>
            Infinite sum: S∞ = a/(1−r) provided |r| &lt; 1
          </div>
          <div class="example-grid">
            <div class="example-card"><div class="example-label">Example 1 — Sum 8 terms of 3, 6, 12, ...</div>
              <p class="soln">a=3, r=2, n=8. S₈ = 3(2⁸−1)/(2−1) = 3(255) = 765</p></div>
            <div class="example-card"><div class="example-label">Example 2 — Infinite series 8 + 4 + 2 + 1 + ...</div>
              <p class="soln">a=8, r=1/2. S∞ = 8/(1−1/2) = 16</p></div>
            <div class="example-card"><div class="example-label">Example 3 — Show 0.999... = 1</div>
              <p class="soln">0.999... = 9/10 + 9/100 + ... = (9/10)/(1−1/10) = (9/10)/(9/10) = 1 ✓</p></div>
          </div>
        </div>
      </div>
    </section>
    <section id="seq-special" class="topic-section">
      <div class="section-header"><span class="sec-icon">⭐</span><h2>Special Series & Summation Formulas</h2><span class="level-badge badge-secondary">A-Level</span></div>
      <div class="section-body">
        <div class="sub">
          <div class="formula-box highlight">
            Σ 1 = n &nbsp;&nbsp; Σ r = n(n+1)/2 &nbsp;&nbsp; Σ r² = n(n+1)(2n+1)/6<br>
            Σ r³ = [n(n+1)/2]² = (Σr)²<br>
            Telescoping series: Σ [f(r)−f(r+1)] = f(1)−f(n+1)
          </div>
          <div class="example-grid">
            <div class="example-card"><div class="example-label">Example — Σ r² from r=1 to 10</div>
              <p class="soln">10×11×21/6 = 385</p></div>
            <div class="example-card"><div class="example-label">Example — Σ r³ from r=1 to 5</div>
              <p class="soln">= (5×6/2)² = 15² = 225. Check: 1+8+27+64+125 = 225 ✓</p></div>
          </div>
        </div>
      </div>
    </section>
    <section id="seq-convergence" class="topic-section">
      <div class="section-header"><span class="sec-icon">🔬</span><h2>Convergence Tests</h2><span class="level-badge badge-uni">University</span></div>
      <div class="section-body">
        <div class="sub">
          <table class="formula-table">
            <tr><th>Test</th><th>Condition for Convergence</th></tr>
            <tr><td>nth term test</td><td>lim aₙ ≠ 0 → diverges (if lim = 0, test fails)</td></tr>
            <tr><td>Geometric series</td><td>|r| &lt; 1</td></tr>
            <tr><td>p-series Σ 1/nᵖ</td><td>p &gt; 1</td></tr>
            <tr><td>Ratio test</td><td>L = lim|aₙ₊₁/aₙ|. L&lt;1 converge, L&gt;1 diverge, L=1 inconclusive</td></tr>
            <tr><td>Root test</td><td>L = lim|aₙ|^(1/n). Same rules as ratio test</td></tr>
            <tr><td>Integral test</td><td>Σf(n) and ∫f(x)dx converge/diverge together (f positive, decreasing)</td></tr>
            <tr><td>Comparison test</td><td>0 ≤ aₙ ≤ bₙ: if Σbₙ converges → Σaₙ converges</td></tr>
            <tr><td>Alternating series</td><td>aₙ decreasing → 0 → converges (Leibniz test)</td></tr>
          </table>
          <div class="example-grid">
            <div class="example-card"><div class="example-label">Example — Σ n!/nⁿ — ratio test</div>
              <p class="soln">L = lim (n+1)!/(n+1)^(n+1) × nⁿ/n! = lim nⁿ/(n+1)ⁿ = 1/e &lt; 1. Converges.</p></div>
          </div>
        </div>
      </div>
    </section>
    <section id="seq-power" class="topic-section">
      <div class="section-header"><span class="sec-icon">⚡</span><h2>Power Series & Radius of Convergence</h2><span class="level-badge badge-uni">University</span></div>
      <div class="section-body">
        <div class="sub">
          <div class="formula-box highlight">
            Power series: Σ aₙ(x−c)ⁿ = a₀ + a₁(x−c) + a₂(x−c)² + ...<br>
            Radius of convergence: R = 1/lim|aₙ₊₁/aₙ| (ratio test on coefficients)<br>
            Interval of convergence: (c−R, c+R) — check endpoints separately
          </div>
          <div class="sub"><h3>Common Maclaurin Series</h3>
            <div class="formula-box">
              eˣ = 1 + x + x²/2! + x³/3! + ... (R=∞)<br>
              sin x = x − x³/3! + x⁵/5! − ... (R=∞)<br>
              cos x = 1 − x²/2! + x⁴/4! − ... (R=∞)<br>
              ln(1+x) = x − x²/2 + x³/3 − ... (R=1, −1&lt;x≤1)<br>
              (1+x)ⁿ = 1 + nx + n(n−1)x²/2! + ... (R=1)
            </div>
          </div>
        </div>
      </div>
    </section>"""
)

# ═══════════════════════════════════════════════════════════════════════════
# NOW GENERATE ALL TOPIC HTML FILES
# ═══════════════════════════════════════════════════════════════════════════

for t in topics:
    content = head(t["title"], t["sub"], t["id"])
    content += wrap(
        t["icon"], t["title"], t["sub"], t["levels"],
        t["breadcrumb"], t["toc"], t["content"],
        t["prev_link"], t["prev_label"],
        t["next_link"], t["next_label"],
        t["id"]
    )
    with open(os.path.join(OUT, t["filename"]), "w", encoding="utf-8") as f:
        f.write(content)
    print(f"  ✅ Generated {t['filename']}")

print(f"\n✅ All {len(topics)} topic pages generated!")