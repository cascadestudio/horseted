"use client";

import React from "react";

const PrivacyPolicyPage = () => {
  return (
    <div className="container mx-auto px-5 py-8">
      <h1 className="text-2xl font-bold mb-4">Politique de confidentialité</h1>

      {/* Introduction */}
      <p className="mb-4">
        La société HORSETED, Société par actions simplifiée au capital de 10 000
        €, dont le siège est situé au 6, Impasse Vauban - 66440 TORREILLES,
        inscrite au registre du commerce et des sociétés sous le numéro
        980946693, Numéro de TVA intracommunautaire FR62980946693, représentée
        par sa présidente-associée Madame Léa ESCANDE, est la rédactrice des
        présentes.
      </p>
      <p className="mb-4">
        Dans le cadre de ses Services, HORSETED met en œuvre des traitements de
        données à caractère personnel. Consciente des enjeux que revêt la
        confidentialité de vos données, le présent document vise à exposer
        clairement la manière dont l’ensemble de vos données sont collectées et
        le détail de l'utilisation qui en est faite.
      </p>
      <p className="mb-4">Vos données peuvent :</p>
      <ul className="list-disc list-inside pl-5 mb-4">
        <li>
          Provenir de tiers ou être collectées à partir de votre activité sur
          notre site Internet.
        </li>
        <li>
          Provenir de l’utilisation de nos Services relatifs à l’intermédiation
          entre nos Utilisateurs sur notre Plateforme Horseted.
        </li>
        <li>
          Provenir de l’inscription et de la participation à nos jeux concours.
        </li>
        <li>
          Provenir de l’inscription et de la participation aux événements
          organisés par nos partenaires.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-4">
        I. Quels sont les traitements que nous effectuons ?
      </h2>

      {/* Data Processing Information */}
      <p className="mb-4">
        Pour davantage de transparence et par souci de lisibilité, nous avons
        représenté sous forme de tableau les différents traitements que nous
        effectuons, les données utilisées, les finalités, ainsi que les bases
        légales qui fondent ce traitement et la durée de conservation de ces
        données.
      </p>

      {/* Table for lg screens */}
      <div className="hidden lg:block">
        <table className="w-full table-auto border-collapse border border-gray-300 mb-8">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">Traitements</th>
              <th className="border border-gray-300 p-2">Données concernées</th>
              <th className="border border-gray-300 p-2">Finalités</th>
              <th className="border border-gray-300 p-2">Base légale</th>
              <th className="border border-gray-300 p-2">
                Durée de conservation
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2 font-bold">
                Analyse des données de connexion
              </td>
              <td className="border border-gray-300 p-2">
                Données de connexion par l'utilisation de cookies
              </td>
              <td className="border border-gray-300 p-2">
                <ul className="list-disc pl-5">
                  <li>Analyser la fréquentation de notre Plateforme</li>
                  <li>
                    Connaître votre temps de navigation et les pages que vous
                    avez visitées sur notre Plateforme
                  </li>
                  <li>Réaliser la prospection commerciale de nos Services</li>
                  <li>
                    Partager vos données à nos partenaires afin d’améliorer les
                    performances de leurs campagnes publicitaires
                  </li>
                  <li>Réaliser des statistiques d’utilisation</li>
                  <li>
                    Vous reconnaître lorsque vous visitez de nouveau notre
                    Plateforme et mémoriser vos préférences et vos activités de
                    navigation
                  </li>
                  <li>
                    Améliorer nos Services et les fonctionnalités proposés à nos
                    Utilisateurs
                  </li>
                </ul>
              </td>
              <td className="border border-gray-300 p-2">
                Consentement (vous devez accepter ce traitement avant que nous
                le mettions en œuvre)
              </td>
              <td className="border border-gray-300 p-2">25 mois</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 font-bold">
                Analyse des données de localisation
              </td>
              <td className="border border-gray-300 p-2">
                Données de localisation anonymes
              </td>
              <td className="border border-gray-300 p-2">
                <ul className="list-disc pl-5">
                  <li>Améliorer nos Services proposés sur notre Plateforme</li>
                  <li>
                    Vous proposer de participer à des événements organisés par
                    nos Partenaires proches de votre localisation
                  </li>
                </ul>
              </td>
              <td className="border border-gray-300 p-2">
                Consentement (vous devez accepter ce traitement avant que nous
                le mettions en œuvre)
              </td>
              <td className="border border-gray-300 p-2">24 heures</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 font-bold">
                Processus d’inscription d’un Utilisateur non-professionnel
              </td>
              <td className="border border-gray-300 p-2">
                <strong>Données obligatoires :</strong> Nom d’utilisateur,
                Adresse e-mail, Mot de passe
                <br />
                <strong>Données facultatives :</strong> Données relatives à une
                carte bancaire, Photo, Informations supplémentaires sur le
                Profil de l’Utilisateur
              </td>
              <td className="border border-gray-300 p-2">
                <h3>
                  <strong>Données obligatoires :</strong>
                </h3>
                <ul className="list-disc pl-5">
                  <li>Permettre l’Inscription gratuite à notre Plateforme</li>
                  <li>
                    Vous permettre de créer votre Compte et de vous connecter
                    ultérieurement
                  </li>
                  <li>
                    Permettre de vous envoyer des sms et des mails concernant
                    l’utilisation de nos Services
                  </li>
                </ul>
                <h3>
                  <strong>Données facultatives :</strong>
                </h3>
                <ul className="list-disc pl-5">
                  <li>
                    Vous permettre d’effectuer des paiements aux fins de
                    réaliser une Commande de Produits
                  </li>
                  <li>
                    Vous permettre de poster des Annonces sur notre Plateforme
                  </li>
                  <li>
                    Vous permettre d’ajouter volontairement une photo pour votre
                    profil
                  </li>
                  <li>
                    Vous permettre de saisir des informations personnelles pour
                    agrémenter le profil de votre Compte
                  </li>
                </ul>
              </td>
              <td className="border border-gray-300 p-2">
                <strong>Données obligatoires :</strong> Obligation contractuelle
                <br />
                <strong>Données facultatives :</strong> Consentement (vous devez
                accepter ce traitement avant que nous le mettions en œuvre)
              </td>
              <td className="border border-gray-300 p-2">
                <strong>Données obligatoires :</strong> Durée des relations
                contractuelles + 3 ans
                <br />
                <strong>Données facultatives :</strong> Retrait des documents et
                informations du Compte ou résiliation du Compte à tout moment
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 font-bold">
                Processus d’inscription d’un Utilisateur professionnel
              </td>
              <td className="border border-gray-300 p-2">
                <strong>Données obligatoires :</strong>
                <h4>Utilisateur personne morale :</h4>
                <ul className="list-disc pl-5">
                  <li>Dénomination sociale</li>
                  <li>N° SIRET</li>
                  <li>Adresse du siège social</li>
                  <li>Nom et prénom du représentant légal</li>
                  <li>Nom et prénom de l’Administrateur responsable</li>
                  <li>Adresse e-mail</li>
                  <li>Numéro de téléphone</li>
                </ul>
                <h4>Utilisateur personne physique :</h4>
                <ul className="list-disc pl-5">
                  <li>N° SIRET</li>
                  <li>Civilité</li>
                  <li>Nom</li>
                  <li>Prénom</li>
                  <li>Adresse e-mail</li>
                  <li>Numéro de téléphone</li>
                </ul>
              </td>
              <td className="border border-gray-300 p-2">
                <h3>
                  <strong>Données obligatoires :</strong>
                </h3>
                <ul className="list-disc pl-5">
                  <li>Permettre l’Inscription gratuite à notre Plateforme</li>
                  <li>
                    Vous permettre de créer vos Identifiants pour vous connecter
                    ultérieurement
                  </li>
                  <li>
                    Permettre de vous envoyer des mails concernant l’utilisation
                    de nos Services
                  </li>
                </ul>
                <h3>
                  <strong>Données facultatives :</strong>
                </h3>
                <ul className="list-disc pl-5">
                  <li>
                    Vous permettre d’effectuer des paiements aux fins de
                    réaliser une Commande
                  </li>
                  <li>
                    Vous permettre de sauvegarder votre moyen de paiement pour
                    des achats ultérieurs
                  </li>
                  <li>
                    Vous permettre de poster des Annonces sur notre Plateforme
                  </li>
                  <li>
                    Vous permettre d’ajouter volontairement une photo de profil
                  </li>
                  <li>
                    Vous permettre de saisir des informations personnelles pour
                    agrémenter le profil de votre Compte
                  </li>
                  <li>
                    Permettre la saisie automatique des informations relatives à
                    votre profil pour la complétude du formulaire de Commande.
                  </li>
                </ul>
              </td>
              <td className="border border-gray-300 p-2">
                <strong>Données obligatoires :</strong> Obligation contractuelle
                <br />
                <strong>Données facultatives :</strong> Consentement (vous devez
                accepter ce traitement avant que nous le mettions en œuvre)
              </td>
              <td className="border border-gray-300 p-2">
                <strong>Données obligatoires :</strong> Durée des relations
                contractuelles + 3 ans
                <br />
                <strong>Données facultatives :</strong> Retrait des documents du
                compte ou résiliation du Compte Utilisateur à tout moment
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 font-bold">
                Inscription à l’aide d’un compte Google ou d’un compte Apple
              </td>
              <td className="border border-gray-300 p-2">
                Nom et prénom, Identifiant du compte Google ou du compte Apple,
                Adresse e-mail
              </td>
              <td className="border border-gray-300 p-2">
                Permettre l’inscription sur la Plateforme à l’aide de votre
                compte utilisateur de Google ou Apple
              </td>
              <td className="border border-gray-300 p-2">
                Consentement (vous devez accepter ce traitement avant que nous
                le mettions en œuvre)
              </td>
              <td className="border border-gray-300 p-2">
                Durée des relations contractuelles + 3 ans
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 font-bold">
                Connexion de l’Utilisateur à l’aide d’un compte Google ou d’un
                compte Apple
              </td>
              <td className="border border-gray-300 p-2">
                Adresse e-mail, Mot de passe
              </td>
              <td className="border border-gray-300 p-2">
                Permettre la connexion de l’Utilisateur concerné à la Plateforme
                à l’aide de votre compte utilisateur de Google ou Apple
              </td>
              <td className="border border-gray-300 p-2">
                Obligation contractuelle
              </td>
              <td className="border border-gray-300 p-2">
                Durée des relations contractuelles + 3 ans
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 font-bold">
                Informations à fournir par l’Utilisateur Vendeur
              </td>
              <td className="border border-gray-300 p-2">
                <h3 className="font-bold">Utilisateur non-professionnel :</h3>
                <ul className="list-disc pl-5">
                  <li>Nom</li>
                  <li>Prénom</li>
                  <li>Date de naissance</li>
                  <li>Adresse complète</li>
                  <li>
                    Informations personnelles indiquées sur une pièce d’identité
                    demandée (nom, prénom, date de naissance, nationalité,
                    civilité, taille)
                  </li>
                  <li>
                    Informations relatives à un relevé d’identité bancaire (nom
                    et prénom du titulaire du compte, IBAN, intitulé de
                    l’établissement)
                  </li>
                </ul>
                <h3 className="font-bold">Utilisateur professionnel :</h3>
                <ul className="list-disc pl-5">
                  <li>Numéro de SIRET</li>
                  <li>Extrait Kbis</li>
                  <li>Statuts (si société)</li>
                  <li>Adresse du siège social</li>
                  <li>Nom et prénom du Représentant légal</li>
                  <li>Adresse du Représentant légal</li>
                  <li>
                    Informations personnelles indiquées sur une pièce d’identité
                    du Représentant légal
                  </li>
                  <li>
                    Informations relatives à un relevé d’identité bancaire (nom
                    et prénom du titulaire du compte, IBAN, intitulé de
                    l’établissement)
                  </li>
                </ul>
              </td>
              <td className="border border-gray-300 p-2">
                <ul className="list-disc pl-5">
                  <li>
                    Vous permettre de pouvoir poster une Annonce pour vendre un
                    Produit sur la Plateforme
                  </li>
                  <li>
                    Permettre à notre PSP de remplir ses obligations relatives à
                    LCB-FT
                  </li>
                  <li>
                    Vous permettre de recevoir le paiement du prix d’un Produit
                    commandé par le PSP de la Plateforme
                  </li>
                </ul>
              </td>
              <td className="border border-gray-300 p-2">
                Intérêt légitime de la Plateforme
              </td>
              <td className="border border-gray-300 p-2">
                Durée de la complétude du questionnaire sur la Plateforme
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 font-bold">
                Formulaire de Commande
              </td>
              <td className="border border-gray-300 p-2">
                <ul className="list-disc pl-5">
                  <li>Nom</li>
                  <li>Prénom</li>
                  <li>Adresse e-mail</li>
                  <li>Numéro de téléphone</li>
                  <li>
                    Adresse complète de livraison (adresse, ville et code
                    postal)
                  </li>
                </ul>
              </td>
              <td className="border border-gray-300 p-2">
                <ul className="list-disc pl-5">
                  <li>Vous permettre de valider votre Commande</li>
                  <li>
                    Nous permettre de générer une étiquette d’envoi pour le
                    Vendeur qui mentionne ces informations pour que le
                    Fournisseur de transport effectue la livraison
                  </li>
                  <li>
                    Vous permettre de recevoir les Produits commandés à
                    l’adresse de livraison indiquée
                  </li>
                  <li>
                    Transmettre votre adresse e-mail à un Utilisateur Pro
                    (Vendeur) afin de lui permettre de remplir son obligation
                    légale d’émettre une facture
                  </li>
                </ul>
              </td>
              <td className="border border-gray-300 p-2">
                Obligation contractuelle
              </td>
              <td className="border border-gray-300 p-2">
                Durée des relations contractuelles + 3 ans
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 font-bold">
                Connexion de l’Utilisateur à son Compte
              </td>
              <td className="border border-gray-300 p-2">
                <h3>
                  <strong>Données obligatoires :</strong>
                </h3>
                <ul className="list-disc pl-5">
                  <li>Nom d’utilisateur</li>
                  <li>Mot de passe</li>
                </ul>
                <h3>
                  <strong>Données facultatives :</strong>
                </h3>
                <ul className="list-disc pl-5">
                  <li>Adresse e-mail</li>
                  OU
                  <li>Numéro de téléphone</li>
                </ul>
              </td>
              <td className="border border-gray-300 p-2">
                <h3>
                  <strong>Données obligatoires :</strong>
                </h3>
                <ul className="list-disc pl-5">
                  <li>
                    Vous permettre de vous connecter à votre Compte utilisateur
                  </li>
                </ul>
                <h3>
                  <strong>Données facultatives :</strong>
                </h3>
                <ul className="list-disc pl-5">
                  <li>
                    Vous permettre de vous connecter autrement que par la saisie
                    de vos Identifiants
                  </li>
                </ul>
              </td>
              <td className="border border-gray-300 p-2">
                <strong>Données obligatoires :</strong> Obligation contractuelle
                <br />
                <strong>Données facultatives :</strong> Consentement (vous devez
                accepter ce traitement avant que nous le mettions en œuvre)
              </td>
              <td className="border border-gray-300 p-2">
                <strong>Données obligatoires :</strong> Durée des relations
                contractuelles + 3 ans
                <br />
                <strong>Données facultatives :</strong> Seule durée du
                traitement de la demande de l’Utilisateur
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 font-bold">
                Information et participation aux événements de nos Partenaires
              </td>
              <td className="border border-gray-300 p-2">
                <ul className="list-disc pl-5">
                  <li>Nom</li>
                  <li>Prénom</li>
                  <li>Adresse e-mail</li>
                  <li>Numéro de téléphone</li>
                  <li>Données de connexion</li>
                </ul>
              </td>
              <td className="border border-gray-300 p-2">
                <ul className="list-disc pl-5">
                  <li>
                    Vous informer de l’organisation d’événements de nos
                    Partenaires
                  </li>
                  <li>
                    Permettre votre inscription à ces événements le cas échéant
                  </li>
                  <li>
                    Permettre d’adresser des notifications des prochains
                    événements
                  </li>
                </ul>
              </td>
              <td className="border border-gray-300 p-2">
                Obligation contractuelle
              </td>
              <td className="border border-gray-300 p-2">
                Durée des relations contractuelles + 3 ans
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 font-bold">
                Information et participation à nos jeux concours et les offres
                promotionnelles de nos Partenaires
              </td>
              <td className="border border-gray-300 p-2">
                <ul className="list-disc pl-5">
                  <li>Nom</li>
                  <li>Prénom</li>
                  <li>Adresse e-mail</li>
                  <li>Numéro de téléphone</li>
                  <li>Données de connexion</li>
                </ul>
              </td>
              <td className="border border-gray-300 p-2">
                <ul className="list-disc pl-5">
                  <li>
                    Vous informer de l’organisation de nos jeux-concours et des
                    offres promotionnelles
                  </li>
                  <li>Vous permettre d’y participer</li>
                  <li>
                    Vous adresser des notifications des prochains événements
                  </li>
                  <li>
                    Vous envoyer un sms ou un mail pour vous annoncer le
                    résultat des jeux concours auxquels vous avez participé
                  </li>
                </ul>
              </td>
              <td className="border border-gray-300 p-2">
                Obligation contractuelle
              </td>
              <td className="border border-gray-300 p-2">
                Durée des relations contractuelles augmentée de 3 ans
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 font-bold">
                Ouverture d’un chat privé entre le Vendeur et l’Acheteur dans le
                cadre de la Vente
              </td>
              <td className="border border-gray-300 p-2">
                <ul className="list-disc pl-5">
                  <li>Nom d’utilisateur</li>
                  <li>
                    Informations relatives à la Commande (Produits commandés,
                    prix des Produits et adresse de livraison)
                  </li>
                  <li>Messages adressées dans le chat</li>
                </ul>
              </td>
              <td className="border border-gray-300 p-2">
                <ul className="list-disc pl-5">
                  <li>
                    Permettre aux Utilisateurs de s’écrire concernant les
                    Produits commandés
                  </li>
                  <li>
                    Permettre aux Utilisateurs de résoudre un litige amiable
                    entre eux (hors mise en œuvre du Service de Protection de
                    l’Acheteur)
                  </li>
                  <li>
                    Permettre la mise en œuvre de la Protection de l’Acheteur
                  </li>
                </ul>
              </td>
              <td className="border border-gray-300 p-2"></td>
              <td className="border border-gray-300 p-2"></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Mobile-Friendly Version for Smaller Screens */}
      <div className="lg:hidden">
        {/* 1st Category */}
        <h3 className="text-lg font-semibold mt-4">
          Analyse des données de connexion :
        </h3>
        <ul className="list-disc list-inside pl-5 mb-4">
          <li>
            <strong>Données concernées :</strong> Données de connexion par
            l'utilisation de cookies
          </li>
          <li>
            <strong>Finalités :</strong>
          </li>
          <ul className="list-disc pl-5">
            <li>Analyser la fréquentation de notre Plateforme</li>
            <li>
              Connaître votre temps de navigation et les pages que vous avez
              visitées sur notre Plateforme
            </li>
            <li>Réaliser la prospection commerciale de nos Services</li>
            <li>
              Partager vos données à nos partenaires afin d’améliorer les
              performances de leurs campagnes publicitaires
            </li>
            <li>Réaliser des statistiques d’utilisation</li>
            <li>
              Vous reconnaître lorsque vous visitez de nouveau notre Plateforme
              et mémoriser vos préférences et vos activités de navigation
            </li>
            <li>
              Améliorer nos Services et les fonctionnalités proposés à nos
              Utilisateurs
            </li>
          </ul>
          <li>
            <strong>Base légale :</strong> Consentement (vous devez accepter ce
            traitement avant que nous le mettions en œuvre)
          </li>
          <li>
            <strong>Durée de conservation :</strong> 25 mois
          </li>
        </ul>

        {/* 2nd Category */}
        <h3 className="text-lg font-semibold mt-4">
          Analyse des données de localisation :
        </h3>
        <ul className="list-disc list-inside pl-5 mb-4">
          <li>
            <strong>Données concernées :</strong> Données de localisation
            anonymes
          </li>
          <li>
            <strong>Finalités :</strong>
          </li>
          <ul className="list-disc pl-5">
            <li>Améliorer nos Services proposés sur notre Plateforme</li>
            <li>
              Vous proposer de participer à des événements organisés par nos
              Partenaires proches de votre localisation
            </li>
          </ul>
          <li>
            <strong>Base légale :</strong> Consentement (vous devez accepter ce
            traitement avant que nous le mettions en œuvre)
          </li>
          <li>
            <strong>Durée de conservation :</strong> 24 heures
          </li>
        </ul>

        {/* 3rd Category */}
        <h3 className="text-lg font-semibold mt-4">
          Processus d’inscription d’un Utilisateur non-professionnel :
        </h3>
        <ul className="list-disc list-inside pl-5 mb-4">
          <li>
            <strong>Données concernées :</strong>
          </li>
          <h4>
            <strong>Données obligatoires :</strong>
          </h4>
          <ul className="list-disc pl-5">
            <li>Nom d’utilisateur</li>
            <li>Adresse e-mail</li>
            <li>Mot de passe</li>
          </ul>
          <h4>
            <strong>Données facultatives :</strong>
          </h4>
          <ul className="list-disc pl-5">
            <li>Données relatives à une carte bancaire</li>
            <li>Photo</li>
            <li>Informations supplémentaires sur le Profil de l’Utilisateur</li>
          </ul>
          <li>
            <strong>Finalités :</strong>
          </li>
          <h4>
            <strong>Données obligatoires :</strong>
          </h4>
          <ul className="list-disc pl-5">
            <li>Permettre l’Inscription gratuite à notre Plateforme</li>
            <li>
              Vous permettre de créer votre Compte et de vous connecter
              ultérieurement
            </li>
            <li>
              Permettre de vous envoyer des sms et des mails concernant
              l’utilisation de nos Services
            </li>
          </ul>
          <h4>
            <strong>Données facultatives :</strong>
          </h4>
          <ul className="list-disc pl-5">
            <li>
              Vous permettre d’effectuer des paiements aux fins de réaliser une
              Commande de Produits
            </li>
            <li>Vous permettre de poster des Annonces sur notre Plateforme</li>
            <li>
              Vous permettre d’ajouter volontairement une photo pour votre
              profil
            </li>
            <li>
              Vous permettre de saisir des informations personnelles pour
              agrémenter le profil de votre Compte
            </li>
            <li>
              Permettre la saisie automatique des informations relatives à votre
              profil pour la complétude du formulaire de Commande.
            </li>
          </ul>
          <li>
            <strong>Base légale :</strong>
          </li>
          <ul className="list-disc pl-5">
            <li>
              <strong>Données obligatoires :</strong> Obligation contractuelle
            </li>
            <li>
              <strong>Données facultatives :</strong> Consentement (vous devez
              accepter ce traitement avant que nous le mettions en œuvre)
            </li>
          </ul>
          <li>
            <strong>Durée de conservation :</strong>
          </li>
          <ul className="list-disc pl-5">
            <li>
              <strong>Données obligatoires :</strong> Durée des relations
              contractuelles + 3 ans
            </li>
            <li>
              <strong>Données facultatives :</strong> Retrait des documents et
              informations du Compte ou résiliation du Compte à tout moment
            </li>
          </ul>
        </ul>

        {/* 4th Category */}
        <h3 className="text-lg font-semibold mt-4">
          Processus d’inscription d’un Utilisateur professionnel :
        </h3>
        <ul className="list-disc list-inside pl-5 mb-4">
          <li>
            <strong>Données concernées :</strong>
          </li>
          <strong className="text-lg font-semibold mt-4">
            Données obligatoires :
          </strong>

          <h5>Utilisateur personne morale :</h5>
          <ul className="list-disc list-inside pl-5 mb-4">
            <li>Dénomination sociale</li>
            <li>N° SIRET</li>
            <li>Adresse du siège social</li>
            <li>Nom et prénom du représentant légal</li>
            <li>Nom et prénom de l’Administrateur responsable</li>
            <li>Adresse e-mail</li>
            <li>Numéro de téléphone</li>
          </ul>

          <h5>Utilisateur personne physique :</h5>
          <ul className="list-disc list-inside pl-5 mb-4">
            <li>N° SIRET</li>
            <li>Civilité</li>
            <li>Nom</li>
            <li>Prénom</li>
            <li>Adresse e-mail</li>
            <li>Numéro de téléphone</li>
          </ul>

          <strong className="text-lg font-semibold mt-4">
            Données facultatives :
          </strong>
          <ul className="list-disc list-inside pl-5 mb-4">
            <li>
              Données relatives à une carte bancaire (nom et prénom du
              titulaire, le numéro de la carte bancaire, date d’expiration)
            </li>
            <li>Photo</li>
            <li>
              Informations supplémentaires sur le Profil de l’Utilisateur (nom,
              prénom, adresse de livraison)
            </li>
          </ul>
          <li>
            <strong>Finalités :</strong>
          </li>
          <h4>
            <strong>Données obligatoires :</strong>
          </h4>
          <ul className="list-disc pl-5">
            <li>Permettre l’Inscription gratuite à notre Plateforme</li>
            <li>
              Vous permettre de créer vos Identifiants pour vous connecter
              ultérieurement
            </li>
            <li>
              Permettre de vous envoyer des mails concernant l’utilisation de
              nos Services
            </li>
          </ul>
          <h4>
            <strong>Données facultatives :</strong>
          </h4>
          <ul className="list-disc pl-5">
            <li>
              Vous permettre d’effectuer des paiements aux fins de réaliser une
              Commande
            </li>
            <li>
              Vous permettre de sauvegarder votre moyen de paiement pour des
              achats ultérieurs
            </li>
            <li>Vous permettre de poster des Annonces sur notre Plateforme</li>
            <li>Vous permettre d’ajouter volontairement une photo de profil</li>
            <li>
              Vous permettre de saisir des informations personnelles pour
              agrémenter le profil de votre Compte
            </li>
            <li>
              Permettre la saisie automatique des informations relatives à votre
              profil pour la complétude du formulaire de Commande.
            </li>
          </ul>
          <li>
            <strong>Base légale :</strong>
          </li>
          <ul className="list-disc pl-5">
            <li>
              <strong>Données obligatoires :</strong> Obligation contractuelle
            </li>
            <li>
              <strong>Données facultatives :</strong> Consentement (vous devez
              accepter ce traitement avant que nous le mettions en œuvre)
            </li>
          </ul>
          <li>
            <strong>Durée de conservation :</strong>
          </li>
          <ul className="list-disc pl-5">
            <li>
              <strong>Données obligatoires :</strong> Durée des relations
              contractuelles + 3 ans
            </li>
            <li>
              <strong>Données facultatives :</strong> Retrait des documents du
              compte ou résiliation du Compte Utilisateur à tout moment
            </li>
          </ul>
        </ul>

        {/* 5th Category */}
        <h3 className="text-lg font-semibold mt-4">
          Inscription à l’aide d’un compte Google ou d’un compte Apple :
        </h3>
        <ul className="list-disc list-inside pl-5 mb-4">
          <li>
            <strong>Données concernées :</strong> Nom et prénom, Identifiant du
            compte Google ou du compte Apple, Adresse e-mail
          </li>
          <li>
            <strong>Finalités :</strong> Permettre l’inscription sur la
            Plateforme à l’aide de votre compte utilisateur de Google ou Apple
          </li>
          <li>
            <strong>Base légale :</strong> Consentement (vous devez accepter ce
            traitement avant que nous le mettions en œuvre)
          </li>
          <li>
            <strong>Durée de conservation :</strong> Durée des relations
            contractuelles + 3 ans
          </li>
        </ul>

        {/* 6th Category */}
        <h3 className="text-lg font-semibold mt-4">
          Connexion de l’Utilisateur à l’aide d’un compte Google ou d’un compte
          Apple :
        </h3>
        <ul className="list-disc list-inside pl-5 mb-4">
          <li>
            <strong>Données concernées :</strong> Adresse e-mail, Mot de passe
          </li>
          <li>
            <strong>Finalités :</strong> Permettre la connexion de l’Utilisateur
            concerné à la Plateforme à l’aide de votre compte utilisateur de
            Google ou Apple
          </li>
          <li>
            <strong>Base légale :</strong> Obligation contractuelle
          </li>
          <li>
            <strong>Durée de conservation :</strong> Durée des relations
            contractuelles + 3 ans
          </li>
        </ul>

        {/* 7th Category */}
        <h3 className="text-lg font-semibold mt-4">
          Informations à fournir par l’Utilisateur Vendeur :
        </h3>
        <ul className="list-disc list-inside pl-5 mb-4">
          <h4>Utilisateur non-professionnel :</h4>
          <ul className="list-disc pl-5">
            <li>Nom</li>
            <li>Prénom</li>
            <li>Date de naissance</li>
            <li>Adresse complète</li>
            <li>
              Informations personnelles indiquées sur une pièce d’identité (nom,
              prénom, date de naissance, nationalité, civilité, taille)
            </li>
            <li>
              Informations relatives à un relevé d’identité bancaire (nom et
              prénom du titulaire du compte, IBAN, intitulé de l’établissement)
            </li>
          </ul>
          <h4>Utilisateur professionnel :</h4>
          <ul className="list-disc pl-5">
            <li>Numéro de SIRET</li>
            <li>Extrait Kbis</li>
            <li>Statuts (si société)</li>
            <li>Adresse du siège social</li>
            <li>Nom et prénom du Représentant légal</li>
            <li>Adresse du Représentant légal</li>
            <li>
              Informations personnelles indiquées sur une pièce d’identité du
              Représentant légal
            </li>
            <li>
              Informations relatives à un relevé d’identité bancaire (nom et
              prénom du titulaire du compte, IBAN, intitulé de l’établissement)
            </li>
          </ul>
          <li>
            <strong>Finalités :</strong>
          </li>
          <ul className="list-disc pl-5">
            <li>
              Vous permettre de pouvoir poster une Annonce pour vendre un
              Produit sur la Plateforme
            </li>
            <li>
              Permettre à notre PSP de remplir ses obligations relatives à
              LCB-FT
            </li>
            <li>
              Vous permettre de recevoir le paiement du prix d’un Produit
              commandé par le PSP de la Plateforme
            </li>
          </ul>
          <li>
            <strong>Base légale :</strong> Intérêt légitime de la Plateforme
          </li>
          <li>
            <strong>Durée de conservation :</strong> Durée de la complétude du
            questionnaire sur la Plateforme
          </li>
        </ul>

        {/* 8th Category */}
        <h3 className="text-lg font-semibold mt-4">Formulaire de Commande :</h3>
        <ul className="list-disc list-inside pl-5 mb-4">
          <li>
            <strong>Données concernées :</strong>
          </li>
          <ul className="list-disc pl-5">
            <li>Nom</li>
            <li>Prénom</li>
            <li>Adresse e-mail</li>
            <li>Numéro de téléphone</li>
            <li>
              Adresse complète de livraison (adresse, ville et code postal)
            </li>
          </ul>
          <li>
            <strong>Finalités :</strong>
          </li>
          <ul className="list-disc pl-5">
            <li>Vous permettre de valider votre Commande</li>
            <li>
              Nous permettre de générer une étiquette d’envoi pour le Vendeur
              qui mentionne ces informations pour que le Fournisseur de
              transport effectue la livraison
            </li>
            <li>
              Vous permettre de recevoir les Produits commandés à l’adresse de
              livraison indiquée
            </li>
            <li>
              Transmettre votre adresse e-mail à un Utilisateur Pro (Vendeur)
              afin de lui permettre de remplir son obligation légale d’émettre
              une facture
            </li>
          </ul>
          <li>
            <strong>Base légale :</strong> Obligation contractuelle
          </li>
          <li>
            <strong>Durée de conservation :</strong> Durée des relations
            contractuelles + 3 ans
          </li>
        </ul>

        {/* 9th Category */}
        <h3 className="text-lg font-semibold mt-4">
          Connexion de l’Utilisateur à son Compte :
        </h3>
        <ul className="list-disc list-inside pl-5 mb-4">
          <h4>
            <strong>Données obligatoires :</strong>
          </h4>
          <ul className="list-disc pl-5">
            <li>Nom d’utilisateur</li>
            <li>Mot de passe</li>
          </ul>
          <h4>
            <strong>Données facultatives :</strong>
          </h4>
          <ul className="list-disc pl-5">
            <li>Adresse e-mail</li>
            OU
            <li>Numéro de téléphone</li>
          </ul>
          <li>
            <strong>Finalités :</strong>
          </li>
          <h4>
            <strong>Données obligatoires :</strong>
          </h4>
          <ul className="list-disc pl-5">
            <li>Vous permettre de vous connecter à votre Compte utilisateur</li>
          </ul>
          <h4>
            <strong>Données facultatives :</strong>
          </h4>
          <ul className="list-disc pl-5">
            <li>
              Vous permettre de vous connecter autrement que par la saisie de
              vos Identifiants
            </li>
          </ul>
          <li>
            <strong>Base légale :</strong>
          </li>
          <ul className="list-disc pl-5">
            <li>
              <strong>Données obligatoires :</strong> Obligation contractuelle
            </li>
            <li>
              <strong>Données facultatives :</strong> Consentement (vous devez
              accepter ce traitement avant que nous le mettions en œuvre)
            </li>
          </ul>
          <li>
            <strong>Durée de conservation :</strong>
          </li>
          <ul className="list-disc pl-5">
            <li>
              <strong>Données obligatoires :</strong> Durée des relations
              contractuelles + 3 ans
            </li>
            <li>
              <strong>Données facultatives :</strong> Seule durée du traitement
              de la demande de l’Utilisateur
            </li>
          </ul>
        </ul>

        {/* 10th Category */}
        <h3 className="text-lg font-semibold mt-4">
          Information et participation aux événements de nos Partenaires :
        </h3>
        <ul className="list-disc list-inside pl-5 mb-4">
          <li>
            <strong>Données concernées :</strong>
          </li>
          <ul className="list-disc pl-5">
            <li>Nom</li>
            <li>Prénom</li>
            <li>Adresse e-mail</li>
            <li>Numéro de téléphone</li>
            <li>Données de connexion</li>
          </ul>
          <li>
            <strong>Finalités :</strong>
          </li>
          <ul className="list-disc pl-5">
            <li>
              Vous informer de l’organisation d’événements de nos Partenaires
            </li>
            <li>Permettre votre inscription à ces événements le cas échéant</li>
            <li>
              Permettre d’adresser des notifications des prochains événements
            </li>
          </ul>
          <li>
            <strong>Base légale :</strong> Obligation contractuelle
          </li>
          <li>
            <strong>Durée de conservation :</strong> Durée des relations
            contractuelles + 3 ans
          </li>
        </ul>

        {/* 11th Category */}
        <h3 className="text-lg font-semibold mt-4">
          Information et participation à nos jeux concours et les offres
          promotionnelles de nos Partenaires :
        </h3>
        <ul className="list-disc list-inside pl-5 mb-4">
          <li>
            <strong>Données concernées :</strong>
          </li>
          <ul className="list-disc pl-5">
            <li>Nom</li>
            <li>Prénom</li>
            <li>Adresse e-mail</li>
            <li>Numéro de téléphone</li>
            <li>Données de connexion</li>
          </ul>
          <li>
            <strong>Finalités :</strong>
          </li>
          <ul className="list-disc pl-5">
            <li>
              Vous informer de l’organisation de nos jeux-concours et des offres
              promotionnelles
            </li>
            <li>Vous permettre d’y participer</li>
            <li>Vous adresser des notifications des prochains événements</li>
            <li>
              Vous envoyer un sms ou un mail pour vous annoncer le résultat des
              jeux concours auxquels vous avez participé
            </li>
          </ul>
          <li>
            <strong>Base légale :</strong> Obligation contractuelle
          </li>
          <li>
            <strong>Durée de conservation :</strong> Durée des relations
            contractuelles augmentée de 3 ans
          </li>
        </ul>

        {/* 12th Category */}
        <h3 className="text-lg font-semibold mt-4">
          Ouverture d’un chat privé entre le Vendeur et l’Acheteur dans le cadre
          de la Vente :
        </h3>
        <ul className="list-disc list-inside pl-5 mb-4">
          <li>
            <strong>Données concernées :</strong>
            <ul className="list-disc pl-5">
              <li>Nom d’utilisateur</li>
              <li>
                Informations relatives à la Commande (Produits commandés, prix
                des Produits et adresse de livraison)
              </li>
              <li>Messages adressées dans le chat</li>
            </ul>
          </li>
          <li>
            <strong>Finalités :</strong>
          </li>
          <ul className="list-disc pl-5">
            <li>
              Permettre aux Utilisateurs de s’écrire concernant les Produits
              commandés
            </li>
            <li>
              Permettre aux Utilisateurs de résoudre un litige amiable entre eux
              (hors mise en œuvre du Service de Protection de l’Acheteur)
            </li>
            <li>Permettre la mise en œuvre de la Protection de l’Acheteur</li>
          </ul>
        </ul>
      </div>
      <p className="mb-4">
        Chaque fois qu'une communication électronique à des fins de prospection
        commerciale est adressée, l’Utilisateur a la possibilité de choisir de
        ne plus en recevoir à l'avenir grâce à un lien de désinscription. En
        outre, il est possible, à tout moment, d'adresser un courrier
        électronique à l'adresse électronique suivante afin de demander de
        cesser l'envoi de ces communications commerciales :{" "}
        <a href="mailto:contact@horseted.com" className="text-blue-500">
          contact@horseted.com
        </a>
      </p>
      {/* Other sections of the Privacy Policy */}
      <h2 className="text-xl font-semibold mt-8 mb-4">
        II. Comment conservons-nous vos données ?
      </h2>
      <p className="mb-4">
        Les données à caractère personnel sont conservées pour les utiliser aux
        strictes fins énumérées dans la présente Politique de confidentialité.
      </p>
      <p className="mb-4">
        Sauf indication contraire dans les paragraphes précédents, les données
        sont conservées aussi longtemps que la personne concernée entretiendra
        une relation contractuelle avec HORSETED. En cas de rupture du contrat
        liant la personne concernée à HORSETED, comme au terme du Service
        sollicitée, et s'il n'y a pas d'autres raisons de poursuivre le
        traitement, les informations seront conservées pendant les périodes
        nécessaires pour se conformer à la réglementation et aux règles de
        prescription en vigueur notamment contractuelles, comptables et fiscales
        ou, le cas échéant, en vue de traiter toute réclamation ou demande
        afférente aux Services fournis.
      </p>
      <p className="mb-4">
        Les données à caractère personnel des Utilisateurs seront conservées
        pendant la durée des relations contractuelles augmentée de 3 ans à des
        fins d'animation et prospection.
      </p>
      <p className="mb-4">
        La conservation des données personnelles des personnes mentionnées est
        réalisée sans préjudice des obligations de conservation ou des délais de
        prescription. En matière de prévention du blanchiment et du financement
        du terrorisme, les données des Utilisateurs sont conservées 5 ans après
        la fin des relations avec HORSETED.
      </p>
      <p className="mb-4">
        Concernant les Données nécessaires au PSP pour satisfaire à ses
        obligations légales de contrôle dites « KYC », le PSP agit en tant que
        responsable du traitement des données. Les Données susmentionnées sont
        saisies sur la Plateforme pour être directement envoyées au PSP. Elles
        ne sont pas sauvegardées par HORSETED.
      </p>
      <p className="mb-4">
        HORSETED ne conserve pas les données bancaires des Utilisateurs
        (Acheteurs et Vendeurs). Dans le cadre de l’utilisation du système de
        paiement intégré du PSP de la Plateforme, le PSP agit en tant que
        responsable du traitement des données bancaires. Sur la base du
        consentement, l’Utilisateur acheteur peut choisir de sauvegarder un
        moyen de paiement pour faciliter le paiement d’une Commande
        ultérieurement.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-4">
        III. A qui sont communiquées vos données ?
      </h2>
      <p className="mb-4">
        HORSETED fait appel à la sous-traitance pour l’hébergement de la
        Plateforme Horseted. HORSETED est garant du respect par le sous-traitant
        de la conservation des données personnelles aux strictes fins de la
        bonne exécution du contrat les unissant et de la mise en place de moyens
        techniques propres à la sécurisation des données personnelles des
        Utilisateurs. HORSETED garantit que le sous-traitant qui assure
        l’hébergement a mis en place les mesures techniques et
        organisationnelles nécessaires à la sécurité et à l’intégrité des
        Données. En tant que de besoin, HORSETED informe que le Sous-traitant
        choisi est situé dans un pays considéré par la Commission européenne
        comme présentant un niveau de protection adéquat au sens de l’article 45
        du RGPD.
      </p>
      <p className="mb-4">
        Dans le cadre de ses Services, HORSETED peut communiquer vos données à
        certains prestataires de services tiers. Ces prestataires de services
        sont soumis à des obligations contractuelles de manière à assurer la
        confidentialité de vos Données. Les prestataires tiers n’auront accès
        qu’aux Données strictement nécessaires pour l’exécution de leurs
        prestations. A titre d’exemple, les seules informations relatives au
        formulaire de Commande seront fournies au Fournisseur de transport pour
        qu’il puisse réaliser la livraison des Produits commandés à l’adresse
        indiquée par l’Utilisateur Acheteur.
      </p>
      <p className="mb-4">
        HORSETED peut communiquer vos données personnelles à la demande des
        autorités administratives ou judiciaires conformément à nos obligations
        légales.
      </p>
      <p className="mb-4">
        Vos données collectées sont accessibles par nos équipes afin qu’elles
        puissent assurer la continuité des Services auprès de nos Utilisateurs.
      </p>
      <p className="mb-4">
        Vos données collectées permettent d’analyser votre activité sur notre
        Plateforme afin d’en améliorer les Services pour les Utilisateurs.
      </p>
      <p className="mb-4">
        Vos données peuvent être communiquées à nos partenaires commerciaux afin
        de pouvoir vous adresser des publicités ciblées. Néanmoins nous vous
        tenons informés lorsque que vos données personnelles sont partagées avec
        des partenaires commerciaux. Vous avez la possibilité de vous opposer à
        un tel partage à tout moment.
      </p>
      <p className="mb-4">
        Il est possible que vous ayez été dirigé vers HORSETED depuis un autre
        site Web ou application. Nous pouvons partager vos données avec ce site
        Web ou application de renvoi.
      </p>
      <p className="mb-4">
        Nous pouvons enfin communiquer des informations agrégées ou anonymes
        avec des tiers. Ainsi nous pouvons partager à nos Partenaires le nombre
        de visite sur notre Plateforme ou encore les Produits les plus en vogue.
        Ces informations ne contiennent aucune donnée personnelle.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-4">
        IV. Quels sont vos droits ?
      </h2>
      <p className="mb-4">
        Les activités de traitement que nous avons mis en place concernant vos
        données personnelles vous confèrent certains droits. A ce titre, vous
        disposez :
      </p>
      <ul className="list-disc list-inside pl-5 mb-4">
        <li>Du droit d'accéder à ses données à caractère personnel,</li>
        <li>Du droit de corriger toute erreur figurant dans les fichiers,</li>
        <li>
          Du droit de faire effacer ses données à caractère personnel, de
          limiter leur traitement ou de s'y opposer,
        </li>
        <li>Du droit de retirer son consentement,</li>
        <li>
          Du droit de s'opposer à la réception de documents de prospection
          commerciale à l'avenir,
        </li>
        <li>
          Du droit de veiller à ce que ces informations soient transférées à la
          personne concernée ou soient transférées à un tiers,
        </li>
        <li>
          Du droit de définir des directives générales et particulières
          définissant la manière dont les personnes concernées entendent que
          soient exercés, après leur décès,
        </li>
        <li>
          Du droit d’introduire une réclamation auprès de l’autorité de
          contrôle, la CNIL, située au 3, Place de Fontenoy TSA 80715 75334
          PARIS Cedex 07.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-4">
        V. Comment nous contacter ou nous faire parvenir une réclamation ?
      </h2>
      <p className="mb-4">
        Toutes les questions soulevées dans la présente Politique, les demandes
        d'exercice des droits de la personne concernée, sont gérées par la
        personne désignée ci-dessous qui peut être contactée par l’envoi d’un
        courrier électronique à l’adresse e-mail suivante :{" "}
        <a href="mailto:contact@horseted.com" className="text-blue-500">
          contact@horseted.com
        </a>
      </p>
      <p className="mb-4">
        Toute demande d'exercice des droits d'accès, de rectification, de
        suppression ou de limitation du traitement, doit être accompagnée de la
        copie d'une pièce d'identité du demandeur.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-4">
        VI. Application de la présente Politique de confidentialité
      </h2>
      <p className="mb-4">
        La présente Politique de confidentialité a été mise à jour le
        01/07/2024.
      </p>
      <p className="mb-4">
        Nous nous réservons le droit de la modifier à tout moment afin de
        fournir une information à jour sur la façon dont nous collectons et
        traitons les données.
      </p>
    </div>
  );
};

export default PrivacyPolicyPage;
