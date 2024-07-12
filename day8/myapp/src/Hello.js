import axios from 'axios';

function Hello() {
  const getMethod = async () => {
    try {
      await axios.post('http://localhost:3001/book/search', {
        keyword: 'a',
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div>
        <button className="btn btn-primary" onClick={getMethod}>
          Call API{' '}
        </button>{' '}
      </div>{' '}
    </>
  );
}

export default Hello;

//จบวันที่ 10 สไลด์ ที่293
