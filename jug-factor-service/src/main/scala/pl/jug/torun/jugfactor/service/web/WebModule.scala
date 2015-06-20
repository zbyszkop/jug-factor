package pl.jug.torun.jugfactor.service.web

import com.softwaremill.macwire.MacwireMacros._
import pl.jug.torun.jugfactor.service.core.AnnotationEventRepository

trait WebModule {
  def annotationEventRepository: AnnotationEventRepository

  lazy val presentationController = wire[PresentationController]

}
