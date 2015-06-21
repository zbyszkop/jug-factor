package pl.jug.torun.jugfactor.service.core

import org.bson.types.ObjectId

case class Presentation(id:Option[ObjectId] = None, title: String, url: String, startTime: Long, duration: Long)
