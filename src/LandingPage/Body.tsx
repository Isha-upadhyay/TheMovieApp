import ScrollList from "./ScrollList";
import Welcome from "./Welcome";

function Body() {
    return (
        <div className="bodyContent">
            <Welcome />
            <section className="topicWiseLists">
                <ScrollList topic="trending" />
                <ScrollList topic="popular" />
                <ScrollList topic="freeToWatch" />
            </section>
        </div>
    )
}
export default Body;