const AttackIcon: React.FC<{ className?: string }> = (props) => {
  return (
    <svg className={props.className} viewBox="0 0 70 65">
      <image
        id="atk"
        xlinkHref="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABBBAMAAACeBc8PAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAFVBMVEUAAAAAAAD///+kwOlXfsKWOyNUQFshzRTGAAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxIAAAsSAdLdfvwAAAAHdElNRQfmAQsMOxDOt/q2AAAAt0lEQVRIx82VsRHCMAxFnQ34QNLHsABkAg4tkMID0Hj/EbB0IrEN9F+V/O+leCfZCUELWqGtPqNiBiBqAYfwLyNkFq0YZxcBjjFaxspYeNLkriJQpYseb928uJha7irSK5EyjZzI4+sK0DHmAJxdyTdp6OZFxJQ2pdW3RuS5bdKYUnUv+JhSvjXwTbKMlbFZjJqs29vSHAmZ4pXzy+XMy7sp58qdiNnb/efo3edjOqa/sj8eFDbmDSd51TDPY6uYAAAAAElFTkSuQmCC"
      />
    </svg>
  );
};

export default AttackIcon;
