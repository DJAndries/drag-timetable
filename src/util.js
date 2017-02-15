class TimetableUtil {
  getHourText(i) {
    const minuteMap = {
      0.25: ':15',
      0.50: ':30',
      0.75: ':45',
    }
    const minute = minuteMap[i % 1.0] ? minuteMap[i % 1.0] : '';
    const fi = Math.floor(i);
    return (i == 0) ? "12 AM" : (fi >= 12 ? (fi == 12 ? 12 : fi - 12) + minute + " PM" : fi + minute + " AM");
  }
}

export default new TimetableUtil();
