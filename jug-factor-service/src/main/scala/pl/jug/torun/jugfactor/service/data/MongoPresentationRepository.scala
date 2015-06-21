package pl.jug.torun.jugfactor.service.data

import com.mongodb.casbah.MongoCollection
import com.mongodb.casbah.commons.Imports._
import com.novus.salat._
import pl.jug.torun.jugfactor.service.core.{Presentation, PresentationRepository, AnnotationEvent, AnnotationEventRepository}

class MongoPresentationRepository(collection: MongoCollection) extends PresentationRepository with SalatContext {

  def add(presentation: Presentation): Unit = {
    collection.insert(grater[Presentation].asDBObject(presentation))
  }

  def byId(id: org.bson.types.ObjectId): Option[Presentation] = {
    collection.findOneByID(id) match {
      case Some(document) => Some(grater[Presentation].asObject(document))
      case None => None
    }
  }

}
