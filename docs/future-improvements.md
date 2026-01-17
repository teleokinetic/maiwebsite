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
