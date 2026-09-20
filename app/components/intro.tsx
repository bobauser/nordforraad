export default function IntroRocketLoading() {
    return (
        <div id="screen-intro">
        <div className="rocket-wrap" id="rocketWrap">
            <div className="rocket-topper" id="rocketTopper">🦉</div>
            <div className="rocket-body">🚀</div>
            <div className="rocket-smoke">
            <span></span><span></span><span></span><span></span>
            </div>
        </div>
        <div className="intro-loading-label" id="introLoadingLabel">Laster inn ordforrådet ditt…</div>
        <div className="intro-quote" id="introQuote"></div>
        </div>
    )
}