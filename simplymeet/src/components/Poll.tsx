import React, {useContext} from 'react';
import Modal from 'react-modal';
import {Line} from 'rc-progress';
import {PollContext} from './PollContext';
import styles from './pollStyles';

const Poll = () => {
  const {
    question,
    setQuestion,
    answers: voteData,
    setAnswers,
    isModalOpen,
    setIsModalOpen,
  } = useContext(PollContext);
  const [totalVotes, setTotalVotes] = React.useState(0);
  const [voted, setVoted] = React.useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
    setQuestion('');
    setTotalVotes(0);
    setAnswers([
      {option: '', votes: 0},
      {option: '', votes: 0},
      {option: '', votes: 0},
      {option: '', votes: 0},
    ]);
  };

  const submitVote = (e, chosenAnswer) => {
    if (!voted) {
      const newAnswers = voteData.map((answer) => {
        if (chosenAnswer.option === answer.option) {
          return {
            ...answer,
            votes: answer.votes + 1,
          };
        } else {
          return answer;
        }
      });

      setAnswers(newAnswers);
      setTotalVotes((prevState) => prevState + 1);
      setVoted((prevState) => !prevState);
    }
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      content="Poll Modal"
      style={styles.customStyles}>
      <div>
        <h1>{question}</h1>
        <div style={styles.flexColumn}>
          {voteData &&
            voteData.map((answer, index) =>
              !voted ? (
                <button
                  style={styles.button}
                  key={index}
                  onClick={(e) => submitVote(e, answer)}>
                  {answer.option}
                </button>
              ) : (
                <div key={index} style={styles.flexCenter}>
                  <h2 style={styles.mr20}>{answer.option}</h2>
                  <Line
                    percent={(answer.votes / totalVotes) * 100}
                    strokeWidth={5}
                    trailWidth={3}
                  />
                  <p style={styles.ml20}>{answer.votes}</p>
                </div>
              ),
            )}
        </div>
        <h3>Total votes: {totalVotes}</h3>
      </div>
    </Modal>
  );
};

export default Poll;
