package pl.jug.torun.jugfactor.service.core

trait PresentationRepository {
   def all(): Seq[Presentation]
   def add(presentation: Presentation)
   def byId(id: org.bson.types.ObjectId): Option[Presentation]
}
