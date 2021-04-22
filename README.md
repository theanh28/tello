# tello
Web server for Gioi IELTS auto student-hw checking

This is a simple firebase functions app that uses an Express app as the /api function. Feel free to look for code reference. Remember that Firebase's Blaze plan 'Pay as you go' still has a limit of resources for free use each month.
# desc
Whenever an action is made in Trello cards of Gioi IELTS class, there will be webhooks firing POST request to this webserver and trigger the homework checking

Dedicated to Gioi IELTS mentors. Thank you for your contribution.

# Also the web server is here if you want to check out
https://us-central1-tello12.cloudfunctions.net

It's a web server so don't expect any UI.
  POST /api/check to check hw
  POST /api/webhook/board to create board webhook
  POST /api/webhook/temp to activate temporary function of webhook, currently removeWebhook()
