const problems = [];

function generateRandomProblem() {
  const n1 = Math.floor(Math.random() * 10) + 1;
  const n2 = Math.floor(Math.random() * 10) + 1;
  const n3 = Math.floor(Math.random() * 10) + 1;
  const n4 = Math.floor(Math.random() * 10) + 1;

  const problemString = `${n1}x^${n1} + ${n2}x^${n2} + ${n3}x^${n3} - ${n4}`;

  return {
    n1,
    n2,
    n3,
    n4,
    problemString
  };
}

module.exports = {
  metadata: {
    name: "quiz",
    role: 0,
    hasPrefix: true,
    author: "Liane",
    description: "Derivatives Quiz.",
    usage: "no args",
  },
  async onRun({ box, event, commandName }) {
    const { n1, n2, n3, n4, problemString } = generateRandomProblem();

    const message = `Derivative problem: ${problemString}`;
    const i = await box.reply(message);

    global.Akhiro.replies.set(i.messageID, {
      commandName,
      n1,
      n2,
      n3,
      n4,
      problemString,
      i,
      author: event.senderID
    });
  },
  async onReply({ box, event, Reply }) {
    const { n1, n2, n3, n4, i, author } = Reply;
    if (author !== event.senderID) return;
    const userAnswer = event.body.trim().replace(/\s+/g, '');

    const correctAnswer = `${(n1 * n1 === 1) ? "" : n1 * n1}x^${n1 - 1} + ${(n2 * n2 === 1) ? "" : n2 * n2}x^${n2 - 1} + ${(n3 * n3 === 1) ? "" : n3 * n3}x^${n3 - 1}`.replace(/\s+/g, '');
    const isCorrect = userAnswer === correctAnswer;

    let feedback;
    if (isCorrect) {
      feedback = "Correct answer! You win!";
    } else {
      feedback = `Incorrect answer.
      Your Answer: ${userAnswer}
      Correct Answer: ${correctAnswer}`;
      global.Akhiro.replies.delete(i.messageID);
    }
    await box.reply(feedback);
  }
};
