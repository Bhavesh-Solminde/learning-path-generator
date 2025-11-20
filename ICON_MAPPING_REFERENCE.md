# Icon Mapping Reference Guide

## Complete Emoji → Icon Conversion Table

### Onboarding Page Icons

#### Learning Goals

| Old Emoji | New Icon                          | Font Awesome Name | Usage                |
| --------- | --------------------------------- | ----------------- | -------------------- |
| 🎓        | <i class="fa-graduation-cap"></i> | `faGraduationCap` | Career Advancement   |
| ↔️        | <i class="fa-arrows-alt"></i>     | `faArrowsAlt`     | Domain Shift         |
| 🎯        | <i class="fa-bullseye"></i>       | `faBullseye`      | Skill Specialization |
| 📜        | <i class="fa-certificate"></i>    | `faCertificate`   | Certification Prep   |

#### Difficulty Levels

| Old Emoji | New Icon                         | Font Awesome Name | Usage        |
| --------- | -------------------------------- | ----------------- | ------------ |
| 👨‍🎓        | <i class="fa-user-graduate"></i> | `faUserGraduate`  | Beginner     |
| 💻        | <i class="fa-code"></i>          | `faCode`          | Intermediate |
| 👔        | <i class="fa-user-tie"></i>      | `faUserTie`       | Advanced     |

#### Learning Styles

| Old Emoji | New Icon                       | Font Awesome Name | Usage               |
| --------- | ------------------------------ | ----------------- | ------------------- |
| 👁️        | <i class="fa-eye"></i>         | `faEye`           | Visual Learner      |
| ⚙️        | <i class="fa-cogs"></i>        | `faCogs`          | Practical Learner   |
| 📚        | <i class="fa-book"></i>        | `faBook`          | Theoretical Learner |
| 📚        | <i class="fa-layer-group"></i> | `faLayerGroup`    | Hybrid Learner      |

#### Time Commitments

| Old Emoji | New Icon                 | Font Awesome Name | Usage            |
| --------- | ------------------------ | ----------------- | ---------------- |
| ⏱️        | <i class="fa-clock"></i> | `faClock`         | All time options |

#### Interest Categories

| Old Emoji | New Icon                       | Font Awesome Name | Category                 |
| --------- | ------------------------------ | ----------------- | ------------------------ |
| 💻        | <i class="fa-laptop-code"></i> | `faLaptopCode`    | Web Development          |
| 📱        | <i class="fa-mobile-alt"></i>  | `faMobileAlt`     | Mobile App Development   |
| 📊        | <i class="fa-chart-line"></i>  | `faChartLine`     | Data Science & Analytics |
| 🧠        | <i class="fa-brain"></i>       | `faBrain`         | AI & Machine Learning    |
| 🔧        | <i class="fa-cogs"></i>        | `faCogs`          | DevOps & Automation      |
| 🛡️        | <i class="fa-shield-alt"></i>  | `faShieldAlt`     | Cybersecurity            |
| ☁️        | <i class="fa-cloud"></i>       | `faCloud`         | Cloud Infrastructure     |
| 🔗        | <i class="fa-link"></i>        | `faLink`          | Blockchain & Web3        |

### Profile Page Icons

#### Achievement Badges

| Old Emoji | New Icon                              | Font Awesome Name     | Badge Name     |
| --------- | ------------------------------------- | --------------------- | -------------- |
| 🚀        | <i class="fa-rocket"></i>             | `faRocket`            | Fast Learner   |
| 📅        | <i class="fa-calendar"></i>           | `faCalendar`          | Consistent     |
| 🧩        | <i class="fa-puzzle-piece"></i>       | `faPuzzlePiece`       | Problem Solver |
| 🤝        | <i class="fa-handshake"></i>          | `faHandshake`         | Team Player    |
| 🏆        | <i class="fa-trophy"></i>             | `faTrophy`            | Expert         |
| 👨‍🏫        | <i class="fa-chalkboard-teacher"></i> | `faChalkboardTeacher` | Mentor         |

### Settings Page Icons

#### Navigation Tabs

| Old Emoji | New Icon                | Font Awesome Name | Tab Name      |
| --------- | ----------------------- | ----------------- | ------------- |
| 👤        | <i class="fa-user"></i> | `faUser`          | Account       |
| 🔔        | <i class="fa-bell"></i> | `faBell`          | Notifications |
| ⚙️        | <i class="fa-cog"></i>  | `faCog`           | Preferences   |
| 🔐        | <i class="fa-lock"></i> | `faLock`          | Security      |

### Courses Page Icons

#### View Toggle

| Old Character | New Icon                | Font Awesome Name | View Type |
| ------------- | ----------------------- | ----------------- | --------- |
| ⊞             | <i class="fa-th"></i>   | `faTh`            | Grid View |
| ☰             | <i class="fa-list"></i> | `faList`          | List View |

### Dashboard Page Icons (Already Using Lordicons)

#### Animated Stats Icons

| Usage          | Icon Type | File          |
| -------------- | --------- | ------------- |
| Points/Trophy  | Lordicon  | `Trophy.json` |
| Days Streak    | Lordicon  | `Fire.json`   |
| Goals          | Lordicon  | `Target.json` |
| Position/Medal | Lordicon  | `Medal.json`  |
| Courses        | Lordicon  | `Books.json`  |
| Completed      | Lordicon  | `Check.json`  |

## Implementation Examples

### Font Awesome Icon Usage

```jsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket } from "@fortawesome/free-solid-svg-icons";

// Basic usage
<FontAwesomeIcon icon={faRocket} />

// With custom styling
<FontAwesomeIcon
  icon={faRocket}
  className="text-2xl text-primary"
/>
```

### Lordicon Usage

```jsx
import { Player } from "@lordicon/react";
import trophyIcon from "./assets/Trophy.json";

// With ref for programmatic control
const iconRef = useRef(null);

<div onMouseEnter={() => iconRef.current?.playFromBeginning()}>
  <Player ref={iconRef} icon={trophyIcon} size={32} />
</div>;
```

## Benefits by Icon Type

### Font Awesome Icons ✅

- ✔️ Professional and consistent appearance
- ✔️ Scalable to any size without quality loss
- ✔️ Easy to customize colors and styles
- ✔️ Excellent browser compatibility
- ✔️ No platform-specific rendering issues
- ✔️ Smaller bundle size with tree-shaking

### Lordicons ⭐

- ✔️ Eye-catching animations
- ✔️ Modern and engaging user experience
- ✔️ Programmatic animation control
- ✔️ Professional animated SVG icons
- ✔️ Lightweight JSON-based format
- ✔️ Perfect for key interaction points

## Color Customization

### Font Awesome

```jsx
// Text color classes
<FontAwesomeIcon icon={faUser} className="text-primary" />
<FontAwesomeIcon icon={faLock} className="text-red-500" />

// Inline styles
<FontAwesomeIcon icon={faClock} style={{ color: '#FF6600' }} />
```

### Lordicon

```jsx
// Using colorize prop
<Player icon={iconData} colorize={isActive ? "#000000" : "#FFFFFF"} />
```

## Accessibility Improvements

All icons now support:

- Screen reader labels via `aria-label`
- Semantic meaning
- Consistent tab navigation
- Better color contrast
- Scalable without pixelation

## Performance Notes

- Font Awesome: Uses tree-shaking to include only used icons
- Lordicons: Lazy-loaded JSON animations
- Both libraries are optimized for production builds
- No additional network requests after initial load
