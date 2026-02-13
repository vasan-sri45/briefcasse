const LineChart = () => {
  return (
    <div className="rounded-2xl shadow-lg p-8 w-[900px] h-[450px]">
      <span className="text-custom-blue font-anton font-normal text-lg mb-2 block tracking-wide">Sales Overview</span>
      <svg viewBox="0 0 500 200" className="w-full mb-8">
        <polyline
          fill="none"
          stroke="#325cda"
          strokeWidth="3"
          points="20,150 90,50 180,40 230,110 300,100 350,180 480,160"
        />
        {/* Dots */}
        {[{cx:20,cy:150},{cx:90,cy:50},{cx:180,cy:40},{cx:230,cy:110},{cx:300,cy:100},{cx:350,cy:180},{cx:480,cy:160}]
         .map((d, i) => (
           <circle key={i} cx={d.cx} cy={d.cy} r="6" fill="#325cda" />
        ))}
        {/* Sup:40% Tooltip */}
        {/* <rect x="28" y="100" width="70" height="28" fill="#C8E3EC" rx="6"/>
        <text x="33" y="120" fontSize="16" fill="#222">Sup : 40%</text> */}
      </svg>
      <div className="flex justify-between text-sm text-letter1 px-2 font-lato font-bold">
        <div>Sus</div>
        <div>Ip</div>
        <div>Tf</div>
        <div>MCA</div>
        <div>Reg</div>
        <div>La&a</div>
        <div>Os</div>
      </div>
    </div>
  );
};

export default LineChart;