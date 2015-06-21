package pl.jug.torun.jugfactor.service.web

import org.bson.types.ObjectId
import org.json4s._
import org.scalatra.json.JacksonJsonSupport
import org.scalatra.{BadRequest, NotFound, Ok, ScalatraServlet}
import pl.jug.torun.jugfactor.service.core.{Presentation, PresentationRepository, AnnotationEventRepository}

class PresentationController(annotationEventRepository: AnnotationEventRepository,
                             presentationRepository: PresentationRepository) extends ScalatraServlet with JacksonJsonSupport {

   protected implicit val jsonFormats: Formats = DefaultFormats + Serializers.objectId

   before() {
     contentType = formats("json")
   }


  get("/") {
    contentType="text/html"

    <html>
      <head><title>Test</title></head>
      <body>Test Body</body>
    </html>
  }

   get("/:id") {
     presentationRepository.byId(new org.bson.types.ObjectId(params("id"))) match {
       case Some(presentation) => {
         val startTime = presentation.startTime
         val endTime = presentation.startTime + presentation.duration * 1000
         log("startTime: " + startTime)
         log("endTime: " + endTime)

         annotationEventRepository.all().filter(p => p.timestamp >= startTime && p.timestamp <= endTime).toList;
       }
       case None => NotFound(s"Location not found: ${params("id")}")
     }
   }



  post("/") {
    val presentation = parsedBody.extract[Presentation]

    presentationRepository.add(presentation)
  }
 }
