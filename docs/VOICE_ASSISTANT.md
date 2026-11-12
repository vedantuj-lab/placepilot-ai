# PlacePilot AI — Voice Assistant System Architecture

**Engine**: Browser Native Web Speech API (`SpeechRecognition` & `SpeechSynthesis`)  
**Cost**: $0 / Free (Zero paid external voice API dependencies)

---

## Locales Supported
- English (India): `en-IN`
- Hindi (India): `hi-IN`
- Marathi (India): `mr-IN`

---

## Features
1. **Speech-to-Text**:
   - Microphone button in Scheme Saathi Chat input (`SchemeSaathiChat.tsx`).
   - Visual pulse indicator while listening.
   - Converts recognized spoken words into editable text before sending.
2. **Text-to-Speech**:
   - Speaker button on chatbot message cards.
   - Reads response aloud using `SpeechSynthesis` voices matching `en-IN`, `hi-IN`, or `mr-IN`.
