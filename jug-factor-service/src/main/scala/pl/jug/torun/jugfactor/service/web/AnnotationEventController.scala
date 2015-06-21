package pl.jug.torun.jugfactor.service.web

import org.json4s._
import org.scalatra.json.JacksonJsonSupport
import org.scalatra.{CorsSupport, NotFound, ScalatraServlet}
import pl.jug.torun.jugfactor.service.core._

class AnnotationEventController(annotationEventRepository: AnnotationEventRepository,
                             presentationRepository: PresentationRepository) extends ScalatraServlet with JacksonJsonSupport with CorsSupport{

   protected implicit val jsonFormats: Formats = DefaultFormats + Serializers.objectId

   before() {
     contentType = formats("json")
   }


  options("/*"){
    response.setHeader("Access-Control-Allow-Headers", request.getHeader("Access-Control-Request-Headers"))
  }
  
  get("/") {
    response.setHeader("Access-Control-Allow-Headers", request.getHeader("Access-Control-Request-Headers"))
    contentType="text/html"

    <html>
      <body>AnnotationEvent controller</body>
    </html>
  }

  post("/") {
    response.setHeader("Access-Control-Allow-Headers", request.getHeader("Access-Control-Request-Headers"))
    val annotationEventInput = parsedBody.extract[AnnotationEventInput]

    val annotationEvent = AnnotationEvent(System.currentTimeMillis(), annotationEventInput.eventType)

    annotationEventRepository.add(annotationEvent)
  }
 }
