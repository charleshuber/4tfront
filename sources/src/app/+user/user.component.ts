import {
  Component,
  OnInit,
} from '@angular/core';
import { UserService } from './user.service';
import { User } from './user';

/*
 * declaration de jQuery qui est importé dans index.html
 * et non en tant que module nodejs
 */
declare var $: any;

@Component({
  selector: 'user',
  template: require('./user.html'),
  styleUrls: ['./user.css']
})
export class UserComponent implements OnInit {

  /*
   * Déclaration des champs correspondants au formulaire d'ajout d'un utilisateur
   */
  public firstName: string;
  public lastName: string;
  public email: string;
  public newPassword: string;
  public newPasswordCheck: string;
  public errorMessage: string;
  public users: User[];

  public successClass = 'has-success';
  public errorClass = 'has-error';

  // Auto Injection du service utilisateur
  constructor(private userService: UserService) { }

  /*
   * A l'initialisation du composant
   * on lance le chargement des utilisateurs depuis le serveur
  */
  public ngOnInit() {
    this.getUsers(null);
  }

  /*
   * Récupération des utilisateurs grâce au service et
   * construction de la table des utilisateurs sur la page
   *
   * Si une fonction de retour est passée en paramètre,
   * on l'execute après la construction de la table
   */
  public getUsers(successCallback) {
    return this.userService.getAll()
      .subscribe(
      (users) => {
        this.users = users;
        this.buildUsersTable();
        if (successCallback) {
          successCallback();
        }
      },
      (error) => this.errorMessage = <any> error);
  }

  /*
   * On supprime toutes les lignes déjà presentes
   * On reconstruit une ligne pour chaque utilisateur,
   * que l'on insert juste avant le pied du tableau
   */
  public buildUsersTable() {
    $('.user_row').remove();
    for (let i in this.users) {
      if (this.users[i]) {
        let user = this.users[i];
        let userRow = this.buildUserRow(user);
        let userTableFooter = $('#user-table-footer');
        userTableFooter.before(userRow);
      }
    }
  }

  /*
   * Construction d'une ligne utilisateur.
   * La ligne est identifiée par l'identifiant de l'utilisateur
   *
   * Pour chaque champ de l'utilisateur on appelle une fonction de construction d'une cellule
   *
   * Pour de le champ "id" on détermine une cellule moins large
   * Pour les champs de mot de passe on défini des entrées de formulaire de type "password"
   */
  public buildUserRow(user) {
    let row = $('<div>');
    row.addClass('row');
    row.addClass('user_row');
    row.attr('id', 'user_row_' + user.id);
    for (let fieldName in user) {
      if (user.hasOwnProperty(fieldName)) {
        let inputType = 'text';
        let width = 2;
        if (fieldName === 'id') {
          width = 1;
        }
        if (fieldName === 'newPassword' || fieldName === 'newPasswordCheck') {
          inputType = 'password';
        }
        row.append(this.buildUserCell(user, fieldName, inputType, width));
      }
    }
    row.append(this.buildDeleteCell(user));
    return row;
  }

  /*
   * Construction d'une cellule pour un champ utilisateur
   * Le champ est indentifié par le nom du champ et par l'identifiant utilisateur
   *
   * Dès que le champ est mis à jour on appelle la fonction de mise à jour de l'utilisateur.
   *
   * Si un des deux champs mot de passe est changé, 
   * on appelle fonction de mise à jour que si les deux champs sont définis
   */
  public buildUserCell(user, fieldName, inputtype, width) {
    let cell = $('<div>');
    cell.addClass('col-md-' + width);
    cell.attr('id', fieldName + '_cell_' + user.id);
    let input = $('<input>');
    input.addClass('form-control');
    input.attr('id', fieldName + '_' + user.id);
    input.attr('type', inputtype);
    input.val(user[fieldName]);
    input.change(() => {
      if (fieldName === 'newPassword' || fieldName === 'newPasswordCheck') {
        let newPasswordValue = $('#newPassword_' + user.id).val();
        let newPasswordCheckValue = $('#newPasswordCheck_' + user.id).val();
        if (!newPasswordValue || !newPasswordCheckValue) {
          return;
        }
      }
      this.updateUser(user.id);
    });
    if (fieldName === 'id') {
      input.attr('readonly', true);
    }
    cell.append(input);
    return cell;
  }

  /*
   * Construction de la cellule de suppression de l'utilisateur
   *
   * Lors d'un clique, on appelle directement la fonction de suppression du service.
   * En cas de succès on execute la fonction de gestion des succès
   * En cas d'erreur on execute la fonction de gestion des erreurs
   */
  public buildDeleteCell(user) {
    let cell = $('<div>');
    cell.addClass('col-md-1');
    let button = $('<button type="button" aria-label="Supprimer l\'utilisateur">');
    button.addClass('btn');
    button.addClass('btn-danger');
    button.append('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>');
    button.click(() => {
      this.userService.delete(user.id)
        .subscribe(
        (deleteUser) => {
          this.handleResult(deleteUser, null);
        },
        (error) => {
          this.handleError(user, error, (usr, fieldName) => fieldName);
          this.markUserRowInColor(user, this.errorClass);
        });
    });
    cell.append(button);
    return cell;
  }

  /*
   * Fonction d'ajout d'un utilisateur
   *
   * Si un seul champs n'est pas défini on ne fait rien
   *
   * On construit un utilisateur avec la valeur des champs du formulaire,
   * qui sont synchronisés avec les variables du composant.
   *
   * On appelle la fonction de création du service.
   * En cas de succès on execute la fonction de gestion des succès
   * En cas d'erreur on execute la fonction de gestion des erreurs
   */
  public addUser() {
    if (!this.firstName || !this.lastName
      || !this.email || !this.newPassword
      || !this.newPasswordCheck) {
      return;
    }

    let user = {
      id: null,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      newPassword: this.newPassword,
      newPasswordCheck: this.newPasswordCheck
    };

    this.userService.create(user)
      .subscribe(
      (newUser) => {
        this.handleResult(newUser, () => this.markUserRowInColor(newUser, this.successClass));
      },
      (error) => {
        this.handleError(user, error, (usr, fieldName) => fieldName);
        this.markUserRowInColor(user, this.errorClass);
      });
  }

  /*
   * Fonction de mise à jour d'un utilisateur
   *
   * Grâce à l'identifiant on construit l'utilisateur, 
   * en récupèrant la valeur de ses champs 
   *
   * On appelle la fonction de mise à jour d'utilisateur du service.
   * En cas de succès on execute la fonction de gestion des succès
   * En cas d'erreur on execute la fonction de gestion des erreurs
   */
  public updateUser(id: number) {
    if (!id) {
      return;
    }

    let email = (<HTMLInputElement>document.getElementById('email_' + id)).value;
    let firstName = (<HTMLInputElement>document.getElementById('firstName_' + id)).value;
    let lastName = (<HTMLInputElement>document.getElementById('lastName_' + id)).value;
    let newPassword = (<HTMLInputElement>document.getElementById('newPassword_' + id)).value;
    let newPasswordCheck = (<HTMLInputElement>
      document.getElementById('newPasswordCheck_' + id)).value;

    let user = {
      id,
      email,
      firstName,
      lastName,
      newPassword,
      newPasswordCheck
    };

    this.userService.update(user)
      .subscribe(
      (newUser) => {
        this.handleResult(newUser, () => this.markUserRowInColor(newUser, this.successClass));
      },
      (error) => {
        this.handleError(user, error, (usr, fieldName) => fieldName + '_' + usr.id);
        this.markUserRowInColor(user, this.errorClass);
      });
  }

  /*
   * Fonction de gestion des succès
   *
   * On supprime les message d'erreurs déjà présents
   * On appelle la fonction de recréation de la table des utilisateurs.
   * On passe en paramètre la fonction de retour à executer après cette reconstruction
   * On réinitialise les champs de création d'un utilisateur
   */
  public handleResult(user, successCallback) {
    $('.errorMsg').remove();
    this.getUsers(successCallback);
    this.firstName = null;
    this.lastName = null;
    this.email = null;
    this.newPassword = null;
    this.newPasswordCheck = null;
  }

  /*
   * Fonction de gestion des ereurs
   *
   * On supprime les message d'erreurs déjà présents
   * On extrait les messages de validation contenus dans l'erreur renvoyée par le service
   */
  public handleError(user, error, elementIdBuilding) {
    let errors: boolean = false;
    $('.errorMsg').remove();
    errors = errors || this.exctractFieldsErrorMsgs(user, error, elementIdBuilding);
    errors = errors || this.exctractGlobalErrorMsgs(user, error, elementIdBuilding);
    if (!errors) {
      this.errorMessage = error;
    }
  }

  /*
   * Pour chaque champ, on extrait les messages relatifs au champ
   * et on les affiches sous l'élement concerné
   *
   * L'identifiant html de l'élément concerné
   * est construit grâce à la fonction de retour "elementIdBuilding" passé en paramètre
   */
  public exctractFieldsErrorMsgs(user, error, elementIdBuilding) {
    if (error.fieldsValidationMessages) {
      for (let fieldName in error.fieldsValidationMessages) {
        if (error.fieldsValidationMessages.hasOwnProperty(fieldName)) {
          let elementId = elementIdBuilding(user, fieldName);
          let fieldInput = document.getElementById(elementId);
          if (fieldInput) {
            let errorMsgs = error.fieldsValidationMessages[fieldName];
            for (let i in errorMsgs) {
              if (errorMsgs[i]) {
                let errorSpan = document.createElement('p');
                errorSpan.innerHTML = errorMsgs[i];
                errorSpan.classList.add('errorMsg');
                fieldInput.parentElement.appendChild(errorSpan);
              }
            }
          }
        }
      }
      return true;
    }
    return false;
  }

  /*
   * On extrait les erreurs globales qui ne sont pas relatives à un champ
   * et on les affiches sous l'élement concerné
   *
   * L'identifiant html de l'élément concerné
   * est construit grâce à la fonction de retour "elementIdBuilding" passé en paramètre
   */
  public exctractGlobalErrorMsgs(user, error, elementIdBuilding) {
    if (error.globalValidationMessages) {
      let errorMsgs = error.globalValidationMessages;
      for (let i in errorMsgs) {
        if (errorMsgs[i]) {
          let errorSpan = document.createElement('p');
          errorSpan.innerHTML = errorMsgs[i];
          errorSpan.classList.add('errorMsg');
          document.getElementById('errors').appendChild(errorSpan);
        }
      }
      return true;
    }
    return false;
  }

  /*
   * On donne temporairement,
   * la couleur de succès ou d'echec à la ligne de l'utilisateur concerné
   */
  public markUserRowInColor(user, cssClass) {
    let rowSelector = '#user_row_' + user.id;
    let inputs = $('input:not([readonly])', rowSelector);
    setTimeout(() => {
      inputs.addClass(cssClass);
      setTimeout(() => {
        inputs.removeClass(cssClass);
      }, 1000);
    }, 1000);
  }
}
