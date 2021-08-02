# Dialogflow inline fullfilment sample

### Polish welcome rhymes

An example of fullfilment function returning a polish rhymes on Default Welcome Intent.

## Setup Instructions

1. Create [Dialogflow Agent](https://console.dialogflow.com/)
2. **Intents** > **Default Welcome Intent** > **Enable webhook call for this intent** and hit save
3. **Fulfillment** > **Enable** the [Inline Editor](https://dialogflow.com/docs/fulfillment#cloud_functions_for_firebase)
4. Copy the functions/index.js to the **Inline Editor**
5. Select **Deploy**
6. **Integrations** > **Web Demo** hit enable and you can try how the bot responds in your browser.

## Configuration

To run Cypress test runner you need to set your Dialog Flow Web Demo link to cypress.json as `baseUrl`
