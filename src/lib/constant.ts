export const languages = [
    "Python", "JavaScript", "Java", "C++", "C#", "Ruby", "PHP", "Swift", "Go", "Rust",
    "TypeScript", "Kotlin", "Scala", "R", "MATLAB", "Perl", "Haskell", "Lua", "Julia", "Dart"
] as const;

export type Language = typeof languages[number];
export const DefaultLanguage: Language = "TypeScript"