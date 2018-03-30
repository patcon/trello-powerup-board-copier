# Trello Power-Up: Board Copier

Trello Power-Up to help make copying a board simple!

The intended use-case for this Power-Up is to streamline the usage of
template Trello boards, particularly when used for onboarding.

**Trello** is... `#todo`

A **Trello Power-Up** is... `#todo`

## Usage

### Hosted

We offer a hosted version of this power-up that you are welcome to add
as a Custom Power-Up. These are added per-team on Trello.

1. **Add our custom power-up** to your Trello team.
  - [ ] Visit the [Trello Power-Up admin page][powerup-admin].
  - [ ] Click the Team you wish to enable it on.
  - [ ] Click "Create A Power-Up".
  - [ ] Enter the following required fields:
    - _Power-Up name:_ Board Copier
    - _Author Name:_ [Your name as support person]
    - _Email:_ [Your email as support person]
    - _Overview:_ Make copying a template board simple!
    - _Description:_ Helps make it a two-click operation for folks to
      copy a board. Great for onboarding or any place where you want
      people to work from a copy of a template board!
    - _Categories:_
      - Communications & Collaboration
      - Board Utilities
    - _Power-Up Capabilities:_
      - authorization-status
      - board-buttons
      - callback
      - on-enable
      - show-authorization
      - show-settings
    - _Power-Up icon URL:_ https://cdn.glitch.com/7e09bb0f-ecb6-4ca0-9b86-b1a5f9fc76a9%2Fcopy-icon-black.png
    - _Iframe connector URL:_ https://trello-powerup-board-copier.glitch.me/index.html
    - _Support email:_ patrick.c.connolly@gmail.com
  - [ ] Click "Done".
2. **Enable the power-up** on a team board.
  - [ ] Create or go to a team board.
  - [ ] At top-right of board, click `Show Menu > Power-Ups > Custom
    > "Enable" for Board Copier`
3. **Authorize the power-up** to use your Trello account.
  - Click the "gear" icon beside "Board Copier", then "Authorize
    Account". Follow the instructions.
  - This is required by each user, and allows the power-up to do copy
    actions on the user's behalf.
  - All credentials are stored within Trello's plugin system. (Our
    hosted power-up app has no storage capabilities.)
4. (Optional) **Set up Slack notifications.** This will let the power-up
   drop a message (and link) into your Slack channel on each copy event.
  - [ ] [Create][create-webhook] an incoming webhook on Slack.
    - Look in top-right to confirm you're using the right Slack team.
    - You'll need admin privileges on Slack to do this.
  - [ ] Once notification channel is selected, note the "Webhook URL".
  - [ ] Customize the "Descriptive Label". (Suggestion: Integration for
    our Board Copier power-up on Trello)
  - [ ] Edit "Customize Name". (Suggestion: Trello Onboarding)
  - [ ] Edit "Customize Icon". (Suggestion: Emoji `:robot:`)
  - [ ] Add the "Webhook URL" to configuration for our board's power-up.
    - Back on the Trello board: `Show Menu > Power-Ups > Custom > "gear"
      icon beside Board Copier > Edit Power-Up Settings`
    - Add the Webhook URL here.
5. Test it out!
  - [ ] From your own or another account, visit the board.
  - [ ] Click "Copy Board" in the top-right corner.
  - [ ] Follow-instructions, and then visit the new board!
  - [ ] As administrator, confirm that a link was dropped into your
    Slack channel.

### Self-Hosted

There are several platforms you can use to host your own. Each has its
own pros and cons.

#### Heroku

Work in-progress. Please feel free to contribute instructions!

#### Glitch

Work in-progress. Please feel free to contribute instructions!

### General Tips

As fellow administrators of the plugin, we'd love to share any
recommendations for setup. Please do submit your own!

- **Set the template board background color to "gray".** The dull color
  will help communicate that this board is static and uneditable. The new board
  will be green, and so this will help the user understand when they
  arrive at the new copy.

## Contributing

- TODO: Explain how Glitch is helpful for development

## License

GPLv3

<!-- Links -->
[powerup-admin]: https://trello.com/power-ups/admin
[create-webhook]: https://my.slack.com/services/new/incoming-webhook/
