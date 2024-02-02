require('express-async-errors');
require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

app.use('/players', require('./routes/players'));
app.use('/teams', require('./routes/teams'));
app.use('/sports', require('./routes/sports'));
app.use('/fans', require('./routes/fans'));
app.use('/matches', require('./routes/matches'));

const { DraftPick, Player, Fan, Team, Sport } = require("./db/models")

app.get('/fans/:fanId/drafts', async(req, res) => {
  const { fanId } = req.params
  const players = await Player.findAll({
    include: {
      model: Fan,
      where: {
        id: fanId
      }
    },
  })

  return res.json(players)
})

app.get('/teams/:id', async(req, res) => {
  const { id } = req.params

  const data = await Team.findAll({
    where: { id },
    include: [{ model: Player, as: "TeamRoster" }, { model: Sport }]
  })

  return res.json(data[0])
})

app.get('/sports', async(req, res) => {
  const data = await Sport.findAll({
    order: [
      ['name', 'DESC']
    ]
  })
  return res.json(data)
})

app.delete('/fans/:fanId', async(req, res) => {
  const { fanId } = req.params
  const fans = await Fan.destroy({
    where: {
      id: fanId
    }
  })
  return res.json({
    message: "Successfully deleted"
  })
})

app.post('/teams/:id/players', async(req, res) => {
  const { id: currentTeamId } = req.params
  const { firstName, lastName, number, isRetired } = req.body
  const player = await Player.create({
    firstName, lastName, number: Number(number), isRetired, currentTeamId: Number(currentTeamId)
  })

  return res.json(player)
})

if (require.main === module) {
  const port = 8004;
  app.listen(port, () => console.log('Server-4 is listening on port', port));
} else {
  module.exports = app;
}
