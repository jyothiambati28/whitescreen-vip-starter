export type Tool = { title: string; slug: string; description: string; category: string; color?: string; icon?: string; mode?: string };
const colors = [
  ["White Screen","white-screen","#ffffff","A clean white screen for lighting and display checks."],
  ["Black Screen","black-screen","#000000","Display a black screen to check dark-room uniformity."],
  ["Red Screen","red-screen","#ff0000","Show solid red across your display."],
  ["Green Screen","green-screen","#00e000","Show solid green across your display."],
  ["Blue Screen","blue-screen","#0000ff","Show solid blue across your display."],
  ["Yellow Screen","yellow-screen","#ffff00","Show solid yellow across your display."],
  ["Orange Screen","orange-screen","#ff8500","Show solid orange across your display."],
  ["Pink Screen","pink-screen","#ff62b0","Show solid pink across your display."],
  ["Purple Screen","purple-screen","#8000ff","Show solid purple across your display."],
  ["Cyan Screen","cyan-screen","#00e5ee","Show solid cyan across your display."],
  ["Magenta Screen","magenta-screen","#ff00d4","Show solid magenta across your display."],
  ["Gray Screen","gray-screen","#808080","Show neutral gray for display inspection."],
  ["Bright White Screen","bright-white-screen","#ffffff","A bright white page for visual inspection. Brightness depends on your device settings."]
] as const;
export const tools: Tool[] = [
 ...colors.map(([title,slug,color,description])=>({title,slug,color,description,category:"Screen Tests",icon:"◉",mode:"color"})),
 {title:"White Screen Image",slug:"white-screen-image",description:"Create and download a plain white PNG image.",category:"Screen Tests",icon:"▧",mode:"image"},
 {title:"Dead Pixel Test",slug:"dead-pixel-test",description:"Cycle solid colours and visually inspect for stuck or dead pixels.",category:"Screen Tests",icon:"⊞",mode:"pixel"},
 {title:"Screen Uniformity Test",slug:"screen-uniformity-test",description:"Use solid colours and gray tones to inspect display uniformity.",category:"Screen Tests",icon:"▦",mode:"uniformity"},
 {title:"Monitor Test",slug:"monitor-test",description:"Review colour, contrast, gradients and sharpness with browser patterns.",category:"Screen Tests",icon:"▣",mode:"monitor"},
 {title:"OLED Gray Test",slug:"oled-gray-test",description:"Display gray levels for visual inspection of dark-screen uniformity.",category:"Screen Tests",icon:"◐",mode:"oled"},
 {title:"OLED Burn-in Test",slug:"oled-burn-in-test",description:"Show test patterns to help visually inspect your display.",category:"Screen Tests",icon:"◒",mode:"oled"},
 {title:"Screen Color Test",slug:"screen-color-test",description:"Cycle through solid colours and inspect them visually.",category:"Screen Tests",icon:"🎨",mode:"color-test"},
 {title:"Screen Resolution Test",slug:"screen-resolution-test",description:"View viewport size and device pixel ratio.",category:"Screen Tests",icon:"↗",mode:"resolution"},
 {title:"Static Screen",slug:"static-screen",description:"Animated TV-style static effect.",category:"Effects",icon:"▧",mode:"static"},
 {title:"No Signal Screen",slug:"no-signal-screen",description:"A stylized no-signal screen simulation.",category:"Effects",icon:"📺",mode:"nosignal"},
 {title:"Matrix Screensaver",slug:"matrix-screensaver",description:"Green falling-code-inspired visual effect.",category:"Effects",icon:"⌘",mode:"matrix"},
 {title:"Flip Clock Screensaver",slug:"flip-clock-screensaver",description:"A live digital clock display.",category:"Effects",icon:"◷",mode:"clock"},
 {title:"Countdown Timer",slug:"countdown-timer",description:"Set a countdown timer in minutes and seconds.",category:"Effects",icon:"⏳",mode:"countdown"},
 {title:"Stopwatch",slug:"stopwatch",description:"A working stopwatch with start, pause and reset.",category:"Effects",icon:"⏱",mode:"stopwatch"},
 {title:"White Noise Screen",slug:"white-noise-screen",description:"Animated visual noise effect.",category:"Effects",icon:"▦",mode:"noise"},
 {title:"Brown Noise Screen",slug:"brown-noise-screen",description:"A visual brown-noise-inspired effect.",category:"Effects",icon:"▧",mode:"noise"},
 {title:"Pink Noise Screen",slug:"pink-noise-screen",description:"A visual pink-noise-inspired effect.",category:"Effects",icon:"▨",mode:"noise"},
 {title:"Broken Screen",slug:"broken-screen",description:"A decorative cracked-screen effect for entertainment.",category:"Effects",icon:"◇",mode:"broken"},
 {title:"Hacker Typer",slug:"hacker-typer",description:"Type on your keyboard to generate pretend terminal code.",category:"Effects",icon:"⌨",mode:"hacker"},
 {title:"DVD Screensaver",slug:"dvd-screensaver",description:"A bouncing DVD-style rectangle animation.",category:"Effects",icon:"▱",mode:"dvd"},
 {title:"Snow Screen",slug:"snow-screen",description:"A gentle animated snow effect.",category:"Effects",icon:"❄",mode:"snow"},
 {title:"Visual Noise",slug:"visual-noise",description:"A simple animated visual texture.",category:"Effects",icon:"▦",mode:"noise"},
 {title:"Color Cycle",slug:"color-cycle",description:"Cycle smoothly through screen colours.",category:"Effects",icon:"🌈",mode:"cycle"},
 {title:"Gradient Screen",slug:"gradient-screen",description:"Display a colour gradient test pattern.",category:"Effects",icon:"◩",mode:"gradient"},
 ...[
 ["Fake Windows 10 Update","fake-windows-10-update"],["Fake Windows 11 Update","fake-windows-11-update"],["Fake Mac Update","fake-mac-update"],["Fake Android Update","fake-android-update"],["Fake Windows XP Update","fake-windows-xp-update"],["Fake Windows XP Boot","fake-windows-xp-boot"],["Fake Chrome OS Update","fake-chrome-os-update"],["Fake Ubuntu Update","fake-ubuntu-update"],["Fake Video Call","fake-video-call"],["Fake Zoom Call","fake-zoom-call"],["Fake Teams Call","fake-teams-call"],["Fake Slack Huddle","fake-slack-huddle"]
 ].map(([title,slug])=>({title,slug,description:"A clearly labeled fictional screen simulation for entertainment only.",category:"Fake Screens",icon:"▣",mode:"fake"} as Tool)),
 ...[
 ["About","about"],["Contact","contact"],["Privacy Policy","privacy"],["Terms of Use","terms"],["Disclaimer","disclaimer"],["Feedback","feedback"],["Guides","guides"]
 ].map(([title,slug])=>({title,slug,description:`Learn more about ${title.toLowerCase()} on WhiteScreen.vip.`,category:"Guides",icon:"ⓘ",mode:"content"} as Tool))
];
export const getTool = (slug: string) => tools.find(t => t.slug === slug);
export const categoryOrder = ["Screen Tests","Effects","Fake Screens","Guides"];
