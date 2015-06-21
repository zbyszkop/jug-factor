package pl.jug.torun.jugfactor.service.data

import com.mongodb.casbah.MongoCollection
import com.mongodb.casbah.commons.Imports._
import com.mongodb.casbah.commons.MongoDBObject
import com.novus.salat._
import pl.jug.torun.jugfactor.service.core.{AnnotationEvent, AnnotationEventRepository}

class MongoAnnotationEventRepository(collection: MongoCollection) extends AnnotationEventRepository with SalatContext {

  def all(): Seq[AnnotationEvent] = {
   collection.find
             .toList.map(o => grater[AnnotationEvent].asObject(o))
  }

  def add(annotationEvent: AnnotationEvent): Unit = {
    collection.insert(grater[AnnotationEvent].asDBObject(annotationEvent))
  }
 }
