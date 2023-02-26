import React, { useState } from 'react';

const TimeInput = () => {

    const [time, setTime] = useState('')
    const handleChange = (e) => {
        setTime(e.target.value)

    }
    console.log(time);
    return (
      <>
        <input
          type="time"
          name="startTime"
          className="event-form__field"
          step="900"
          value={time}
          onChange={handleChange}
        />
      </>
    );
};

export default TimeInput;
