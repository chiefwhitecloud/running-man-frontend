import PropTypes from 'prop-types';

export const RaceResultPropType = PropTypes.shape({
  racerId: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  position: PropTypes.number.isRequired,
  bibNumber: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  sex: PropTypes.string.isRequired,
  sexPosition: PropTypes.number.isRequired,
  ageCategory: PropTypes.string.isRequired,
  ageCategoryPosition: PropTypes.number.isRequired,
});
