package pl.jug.torun.jugfactor.service.web

import org.json4s._
import org.scalatra.json.JacksonJsonSupport
import org.scalatra.{BadRequest, NotFound, Ok, ScalatraServlet}
import pl.jug.torun.jugfactor.service.core.AnnotationEventRepository

class PresentationController(annotationEventRepository: AnnotationEventRepository) extends ScalatraServlet with JacksonJsonSupport {

   protected implicit val jsonFormats: Formats = DefaultFormats + Serializers.objectId

   before() {
     contentType = formats("json")
   }

   get("/") {
     annotationEventRepository.all()
   }
 }
