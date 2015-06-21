package pl.jug.torun.jugfactor.service.core

trait AnnotationEventRepository {
   def all(): Seq[AnnotationEvent]
  def add(annotationEvent: AnnotationEvent)
 }
