import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { applyFoodEmojis, emojiForName } from "./food-emoji.ts";
import type { Bite } from "./types.ts";

describe("emojiForName", () => {
  it("maps the Greek+English dictionary and nothing else", () => {
    const cases: [string, string][] = [
      ["γάλα", "🥛"],
      ["γαλα", "🥛"],
      ["milk", "🥛"],
      ["γιαούρτι", "🥛"],
      ["yogurt", "🥛"],
      ["καφές", "☕"],
      ["coffee", "☕"],
      ["ελληνικός", "☕"],
      ["νερό", "💧"],
      ["water", "💧"],
      ["τοστ", "🥪"],
      ["toast", "🥪"],
      ["αυγά", "🍳"],
      ["eggs", "🍳"],
      ["σαλάτα", "🥗"],
      ["salad", "🥗"],
      ["κοτόπουλο", "🍗"],
      ["chicken", "🍗"],
      ["ζυμαρικά", "🍝"],
      ["pasta", "🍝"],
      ["ρύζι", "🍚"],
      ["rice", "🍚"],
      ["σουβλάκι", "🥙"],
      ["σοκολάτα", "🍫"],
      ["chocolate", "🍫"],
      ["φρούτο", "🍎"],
      ["fruit", "🍎"],
      ["μήλο", "🍎"],
      ["φράουλα", "🥤"],
      ["smoothie", "🥤"],
      ["ροδάκινο", "🍑"],
      ["peach", "🍑"],
      ["μπανάνα", "🍌"],
      ["banana", "🍌"],
      ["τυρί", "🧀"],
      ["cheese", "🧀"],
      ["κράκερ", "🍘"],
      ["cracker", "🍘"],
      ["αυγό", "🍳"],
      ["egg", "🍳"],
      ["ψωμί", "🍞"],
      ["bread", "🍞"],
      ["apple", "🍎"],
      ["πορτοκάλι", "🍊"],
      ["orange", "🍊"],
    ];
    for (const [name, emoji] of cases) {
      assert.equal(emojiForName(name), emoji, name);
    }
  });

  it("never defaults unknown food to a peach", () => {
    assert.equal(emojiForName("xyz"), "🍽️");
    assert.equal(emojiForName("μέλι"), "🍽️");
    assert.equal(emojiForName(""), "🍽️");
    assert.notEqual(emojiForName("γάλα"), "🍑");
  });

  it("matches contains, ignoring case and accents", () => {
    assert.equal(emojiForName("ΜΠΑΝΑΝΑ"), "🍌");
    assert.equal(emojiForName("τυρι με κράκερ"), "🧀");
    assert.equal(emojiForName("πορτοκαλι φρέσκο"), "🍊");
    assert.equal(emojiForName("ψωμί ολικής"), "🍞");
  });

  it("prefers the leftmost match in compound names", () => {
    assert.equal(emojiForName("Κοτόπουλο με σαλάτα"), "🍗");
    assert.equal(emojiForName("Τοστ με αυγό"), "🥪");
    assert.equal(emojiForName("Smoothie φράουλα"), "🥤");
  });
});

describe("applyFoodEmojis", () => {
  it("rewrites already saved items with the new map", () => {
    const bite = (name: string, emoji: string): Bite => ({
      id: name,
      meal: "snack",
      name,
      emoji,
      note: "",
      kcal: null,
      time: "10:00",
    });
    const days = {
      "2026-09-11": [bite("γαλα", "🍑"), bite("αυγά", "🥚"), bite("μπανάνα", "🍽️")],
    };
    const next = applyFoodEmojis(days);
    assert.equal(next["2026-09-11"]![0]!.emoji, "🥛");
    assert.equal(next["2026-09-11"]![1]!.emoji, "🍳");
    assert.equal(next["2026-09-11"]![2]!.emoji, "🍌");
  });
});
