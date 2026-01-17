# Future Improvements for Workout Logger

## Progression Content Simplification

**Priority**: Medium
**Status**: Planned

### Current Issue
Progression notes are too verbose and technical. Example:
- Current: "Track total reps. Build volume."
- Current: "Build to 3x8 at 185 before adding load. Then 195lb for 3x5."

### Desired Behavior
Make progression guidance simple, actionable, and prescriptive:
- **Better**: "Try to add 1 rep every session. Once you hit 10 reps, increase weight."
- **Better**: "Add 5lb when you can do 3x8"

### Guidelines for Rewriting
1. **Be specific**: Tell them exactly what to do next
2. **Be concise**: 1-2 short sentences max
3. **Focus on the next step**: Not the entire progression path
4. **Use simple language**: Avoid jargon

### Examples to Rewrite

| Exercise | Current Progression | Better Progression |
|----------|-------------------|-------------------|
| Pull-Up | "Track total reps. Build volume." | "Add 1 rep each session. At 15 total reps, add weight." |
| Back Squat | "Build to 3x8 at 185 before adding load. Then 195lb for 3x5." | "Add 1 rep per set. When you hit 3x8, increase to 195lb." |
| Ring Support | "Build to 3x60s before ring dip eccentrics" | "Add 5 seconds each session. At 3x60s, move to ring dips." |
| Hamstring Slide | "Progress to 1-leg eccentric when 3x10 is easy and confident" | "At 3x10, switch to 1-leg eccentric (slower tempo)." |

### Implementation Notes
- This will require updating the `progressionNote` field in each exercise in the program JSON
- Consider adding progression templates to make this easier for future programs
- Could potentially auto-generate simple progression text based on exercise type

### Related Improvements
- Consider adding auto-flagging when progression criteria are met (Phase 2)
- Surface "what comes next" from exercise library (Phase 2)
- Visual indicators when client is ready to progress

---

## Other Future Ideas

### Client Dashboard (Home Base)

**Priority**: TBD
**Status**: Idea Stage

Build a central dashboard that serves as the client's home base for all workout-related activities.

**Core Concept**:
- Landing page when client visits their training URL
- Replaces or enhances current overview screen
- Focus on quick access and motivation

**Potential Features** (to be defined):
- [ ] Big, prominent "Start Next Workout" button
- [ ] Data visualization/display (charts, trends, progress)
- [ ] Recent workout summary
- [ ] Streak tracking (consecutive workout days)
- [ ] Quick stats (total sessions, volume milestones, etc.)
- [ ] Personal records / achievements
- [ ] Upcoming session preview
- [ ] Notes/messages from coach

**Design Philosophy**:
- Clean, motivating, easy to navigate
- Mobile-first (most clients will use on phone)
- Fast load time
- Clear call-to-action
- Visual feedback on progress

**Implementation Questions**:
- What data visualizations are most motivating?
- How much info before it feels overwhelming?
- Balance between data and simplicity
- Integration with Google Sheets data

---

### UI/UX Research & Design Polish

**Priority**: Later (after functionality is solid)
**Status**: Planned

Make the workout logger look polished and professional after core functionality is working well.

**Goals**:
- Visual appeal and professionalism
- Improved user experience
- Brand consistency
- Delight and motivation

**Approach** (TBD):
- [ ] Research best practices for workout logging UIs
- [ ] Analyze competitor apps (Strong, Hevy, etc.)
- [ ] Study fitness app design patterns
- [ ] Gather user feedback on current design
- [ ] Create mood board / design inspiration
- [ ] Define color palette and typography
- [ ] Design system / component library

**Areas to Polish**:
- [ ] Color scheme (currently basic dark mode)
- [ ] Typography and hierarchy
- [ ] Button styles and interactions
- [ ] Form inputs and focus states
- [ ] Animations and transitions
- [ ] Loading states and feedback
- [ ] Icons and visual elements
- [ ] Spacing and layout rhythm
- [ ] Mobile touch targets and gestures

**Resources to Explore**:
- Dribbble/Behance for fitness app designs
- Apple Human Interface Guidelines
- Material Design for motion/interaction patterns
- Accessibility guidelines (WCAG)

**Note**: Focus on making it work well first, then make it look great. Function before form.

---

### Auto-Fill Input Boxes from Last Session

**Priority**: Medium-High
**Status**: Planned

**Current Issue**:
- "Last session" data displays at top (e.g., "5, 5, 5 @ 155lb")
- But input boxes still show program defaults (e.g., placeholder "185lb")
- User has to manually remember and type the previous session's values

**Desired Behavior**:
- Input boxes should pre-populate with last session's actual values
- If last session was 5 reps @ 155lb, those should be the default values in the boxes
- User can then adjust up/down as needed for progression
- Falls back to program defaults if no previous session data exists

**Implementation Approach**:
- Extend `fetchLastSession()` to return the last session's reps and load
- Store these values in sessionData when initializing
- Pre-fill input boxes with last session values instead of program defaults
- Keep placeholder text as fallback when no previous data

**Benefits**:
- Faster workout logging (less typing)
- Easier to see progression (change from 155 to 160, not retype everything)
- Reduces cognitive load (don't need to remember last week's numbers)
- More seamless integration with Google Sheets data

**Technical Notes**:
- No LLM needed - just extend existing fetchLastSession() function
- May need to handle cases where set count changed between sessions
- Should still show target reps from program (e.g., "5") as reference

---

### UI/UX Improvements
- [ ] Add visual progress indicator showing reps added over time
- [ ] Highlight when a PR is achieved
- [ ] Add confetti animation on session complete
- [ ] Dark mode toggle

### Data & Analytics
- [ ] Coach dashboard with trend visualization
- [ ] 4-week rolling averages
- [ ] Volume tracking (sets × reps × load)
- [ ] Frequency tracking

### Program Management
- [ ] Program versioning in Google Sheets
- [ ] Multiple programs per client
- [ ] Program templates library
- [ ] Easy program duplication/modification

### Multi-Client Support
- [ ] Client selector on overview screen
- [ ] URL parameters for client selection
- [ ] Client authentication/privacy
- [ ] Separate Google Sheet tabs auto-created

### Exercise Library Integration
- [ ] Link exercises to detailed library entries
- [ ] Video demonstrations
- [ ] Alternative exercise suggestions
- [ ] Auto-regression when performance drops
