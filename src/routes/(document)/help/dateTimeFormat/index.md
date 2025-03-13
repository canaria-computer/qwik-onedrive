---
title: 🕰️ Customizing Your Clock Display Format
last-modified: 2024-12-26
published: 2024-12-26
---

Welcome to the clock display format customization guide! Here's how you can personalize your clock display using Day.js formatting.

## 📅 Basic Format Symbols

| Symbol | Meaning                  | Example       |
| :----: | :----------------------- | :------------ |
|  YYYY  | 4-digit year             | 2024          |
|   MM   | 2-digit month            | 01-12         |
|   DD   | 2-digit day              | 01-31         |
|   HH   | 24-hour format (2-digit) | 00-23         |
|   mm   | 2-digit minutes          | 00-59         |
|   ss   | 2-digit seconds          | 00-59         |
|  ddd   | Abbreviated day of week  | Sun, Mon, ... |

## 💡 Formatting Tips

- Use any spaces or separators (`:`, `-`, `/`, etc.) freely in your format.
- Enclose text in `[]` to display it literally. Example: `[Year: ]YYYY` → "Year: 2024"

## ⚠️ Note on Milliseconds

Due to performance constraints, setting milliseconds (SSS) will not have any effect. We recommend using seconds as the smallest time unit.

## 🎨 Format Examples

1. `YYYY-MM-DD HH:mm:ss` → 2024-12-31 23:59:59
2. `ddd, MMM DD, YYYY HH:mm` → Tue, Dec 31, 2024 23:59
3. `MM/DD/YY h:mm A` → 12/31/24 11:59 PM

## 🕰️ Advanced Formatting Options

Our app supports advanced formatting through the Day.js AdvancedFormat plugin. This allows you to use a wide range of formatting options to customize your clock display.

## 📅 Available Format Symbols

You can use both basic and advanced formatting symbols in your clock display. Here are some examples:

- Basic: `YYYY` (4-digit year), `MM` (2-digit month), `DD` (2-digit day)
- Advanced: `Q` (quarter), `Do` (day with ordinal), `X` (Unix timestamp)

## 🔗 Detailed Format Lists

For a complete list of available format options, please refer to these Day.js documentation pages:

1. [Advanced Format Options](https://day.js.org/docs/en/plugin/advanced-format)
2. [Basic Format Options](https://day.js.org/docs/en/display/format#list-of-all-available-formats)

These resources provide comprehensive information on all the formatting symbols you can use to create your perfect clock display.
