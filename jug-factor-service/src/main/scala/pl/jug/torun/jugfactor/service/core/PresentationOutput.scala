package pl.jug.torun.jugfactor.service.core

case class PresentationOutput(id: org.bson.types.ObjectId, title: String, videoUrl: String, startTime: Long, duration: Long,
                               annotations: Seq[AnnotationEventOutput])
