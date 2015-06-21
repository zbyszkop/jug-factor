package pl.jug.torun.jugfactor.service.web

import com.softwaremill.macwire.MacwireMacros._
import pl.jug.torun.jugfactor.service.core.{PresentationRepository, AnnotationEventRepository}

trait WebModule {
  def annotationEventRepository: AnnotationEventRepository
  def presentationRepository: PresentationRepository

  lazy val presentationController = wire[PresentationController]
  lazy val annotationEventController = wire[AnnotationEventController]

}
