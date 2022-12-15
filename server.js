/// Import Dependencies

const express = require('express');
const budgets = require('./models/budget');
const methodOverride = require("method-override")

const app = express();
const PORT = 2000;

// Middleware
app.get('/budgets', (request, response) => {
    console.log(budgets)
    const bankTotal = budgets.reduce((total, amount) => total + +amount.amount, 0)
        let className = "nuetral"
            if (bankTotal < 0){
             className = "negative"
            } else if (bankTotal > 0){
            className = "positive"
            }else if(bankTotal === 0){
                className = "nuetral"
            }
    response.render(
        'index.ejs',
        {
            allBudgets:budgets,
            budgets,
            className,
            bankTotal
        }
    );
});

app.get("/budgets/new", (request, response) => {
    response.render("new.ejs",)
})

app.post("/budgets", (request, response) => {
    budgets.push(request.body);
    response.redirect("/budgets");
});

app.delete('/budgets/:id', (request, response) => {
    budgets.splice(request.params.id, 1)
    response.redirect("/budgets")
});

app.get('/budgets/:index', (request, response) => {
    response.render('show.ejs', {
        budget: budgets[request.params.index],
        index: request.params.id,
    });
});

// Server Listener

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  })